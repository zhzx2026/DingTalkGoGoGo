#!/usr/bin/env python3
import argparse
import datetime as dt
import hashlib
import hmac
import json
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List, Optional


def sign(key_bytes: bytes, message: str) -> bytes:
    return hmac.new(key_bytes, message.encode("utf-8"), hashlib.sha256).digest()


def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def endpoint_host(region: str, bucket: str) -> str:
    return f"{bucket}.s3.{region}.amazonaws.com"


def compact_xml_error(payload: str) -> str:
    text = (payload or "").strip()
    if not text:
        return ""
    try:
        root = ET.fromstring(text)
    except ET.ParseError:
        return " ".join(text.split())[:220]
    message = ""
    code = ""
    for child in root.iter():
        tag = child.tag.split("}")[-1]
        value = (child.text or "").strip()
        if tag == "Code" and value:
            code = value
        if tag == "Message" and value:
            message = value
    if code and message:
        return f"{code}: {message}"
    if code:
        return code
    if message:
        return message
    return " ".join(text.split())[:220]


def signed_request(
    *,
    method: str,
    region: str,
    bucket: str,
    key: str,
    body: bytes,
    access_key: str,
    secret_key: str,
    session_token: str,
    timeout_seconds: int,
    extra_headers: Optional[Dict[str, str]] = None,
) -> tuple[int, str]:
    host = endpoint_host(region, bucket)
    amz_date = dt.datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    short_date = amz_date[:8]
    encoded_key = "/".join(urllib.parse.quote(part, safe="") for part in key.split("/") if part)
    canonical_uri = f"/{encoded_key}" if encoded_key else "/"

    headers = {
        "host": host,
        "x-amz-content-sha256": sha256_hex(body),
        "x-amz-date": amz_date,
    }
    if session_token:
        headers["x-amz-security-token"] = session_token
    if extra_headers:
        for name, value in extra_headers.items():
            headers[name.lower()] = value

    canonical_headers = "".join(f"{name}:{' '.join(value.strip().split())}\n" for name, value in sorted(headers.items()))
    signed_headers = ";".join(sorted(headers))
    payload_hash = headers["x-amz-content-sha256"]
    canonical_request = "\n".join([
        method,
        canonical_uri,
        "",
        canonical_headers,
        signed_headers,
        payload_hash,
    ])
    credential_scope = f"{short_date}/{region}/s3/aws4_request"
    string_to_sign = "\n".join([
        "AWS4-HMAC-SHA256",
        amz_date,
        credential_scope,
        sha256_hex(canonical_request.encode("utf-8")),
    ])
    k_date = sign(("AWS4" + secret_key).encode("utf-8"), short_date)
    k_region = sign(k_date, region)
    k_service = sign(k_region, "s3")
    k_signing = sign(k_service, "aws4_request")
    signature = hmac.new(k_signing, string_to_sign.encode("utf-8"), hashlib.sha256).hexdigest()
    authorization = (
        f"AWS4-HMAC-SHA256 Credential={access_key}/{credential_scope}, "
        f"SignedHeaders={signed_headers}, Signature={signature}"
    )

    url = f"https://{host}{canonical_uri}"
    request = urllib.request.Request(url, data=body, method=method)
    for name, value in headers.items():
        request.add_header(name, value)
    request.add_header("Authorization", authorization)

    try:
        with urllib.request.urlopen(request, timeout=timeout_seconds) as response:
            return response.status, response.read(512).decode("utf-8", "ignore")
    except urllib.error.HTTPError as error:
        return error.code, error.read(1024).decode("utf-8", "ignore")
    except urllib.error.URLError as error:
        return 599, str(error.reason)


def create_bucket(
    *,
    region: str,
    bucket: str,
    access_key: str,
    secret_key: str,
    session_token: str,
    timeout_seconds: int,
) -> tuple[int, str]:
    if region == "us-east-1":
        body = b""
    else:
        body = (
            '<?xml version="1.0" encoding="UTF-8"?>'
            '<CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">'
            f"<LocationConstraint>{region}</LocationConstraint>"
            "</CreateBucketConfiguration>"
        ).encode("utf-8")
    return signed_request(
        method="PUT",
        region=region,
        bucket=bucket,
        key="",
        body=body,
        access_key=access_key,
        secret_key=secret_key,
        session_token=session_token,
        timeout_seconds=timeout_seconds,
        extra_headers={"content-type": "application/xml"} if body else None,
    )


def put_object(
    *,
    region: str,
    bucket: str,
    key: str,
    body: bytes,
    access_key: str,
    secret_key: str,
    session_token: str,
    timeout_seconds: int,
) -> tuple[int, str]:
    return signed_request(
        method="PUT",
        region=region,
        bucket=bucket,
        key=key,
        body=body,
        access_key=access_key,
        secret_key=secret_key,
        session_token=session_token,
        timeout_seconds=timeout_seconds,
        extra_headers={"content-type": "application/octet-stream"},
    )


def delete_object(
    *,
    region: str,
    bucket: str,
    key: str,
    access_key: str,
    secret_key: str,
    session_token: str,
    timeout_seconds: int,
) -> tuple[int, str]:
    return signed_request(
        method="DELETE",
        region=region,
        bucket=bucket,
        key=key,
        body=b"",
        access_key=access_key,
        secret_key=secret_key,
        session_token=session_token,
        timeout_seconds=timeout_seconds,
    )


def delete_bucket(
    *,
    region: str,
    bucket: str,
    access_key: str,
    secret_key: str,
    session_token: str,
    timeout_seconds: int,
) -> tuple[int, str]:
    return signed_request(
        method="DELETE",
        region=region,
        bucket=bucket,
        key="",
        body=b"",
        access_key=access_key,
        secret_key=secret_key,
        session_token=session_token,
        timeout_seconds=timeout_seconds,
    )


def safe_bucket_prefix(raw: str) -> str:
    cleaned = "".join(ch if ch in "abcdefghijklmnopqrstuvwxyz0123456789" else "-" for ch in raw.lower()).strip("-")
    cleaned = "-".join(part for part in cleaned.split("-") if part)
    if not cleaned:
        cleaned = "godingtalk-s3-bench"
    return cleaned[:28].strip("-") or "godingtalk-s3-bench"


def make_bucket_name(prefix: str, region: str, run_token: str) -> str:
    suffix = hashlib.sha1(f"{region}-{run_token}".encode("utf-8")).hexdigest()[:10]
    bucket = f"{prefix}-{region}-{run_token[:8]}-{suffix}"
    return bucket[:63].strip("-")


def cleanup_bucket(
    *,
    region: str,
    bucket: str,
    object_key: str,
    access_key: str,
    secret_key: str,
    session_token: str,
    timeout_seconds: int,
) -> List[str]:
    notes: List[str] = []
    status, response = delete_object(
        region=region,
        bucket=bucket,
        key=object_key,
        access_key=access_key,
        secret_key=secret_key,
        session_token=session_token,
        timeout_seconds=timeout_seconds,
    )
    if status not in (204, 404):
        notes.append(f"delete object failed: {compact_xml_error(response) or status}")

    status, response = delete_bucket(
        region=region,
        bucket=bucket,
        access_key=access_key,
        secret_key=secret_key,
        session_token=session_token,
        timeout_seconds=timeout_seconds,
    )
    if status not in (204, 404):
        notes.append(f"delete bucket failed: {compact_xml_error(response) or status}")
    return notes


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--access-key", required=True)
    parser.add_argument("--secret-key", required=True)
    parser.add_argument("--session-token", default="")
    parser.add_argument("--file", required=True)
    parser.add_argument("--regions", required=True)
    parser.add_argument("--bucket-prefix", default="godingtalk-s3-bench")
    parser.add_argument("--timeout-seconds", type=int, default=90)
    parser.add_argument("--runner-label", default="GitHub-hosted ubuntu-latest")
    parser.add_argument("--output-jsonl", required=True)
    parser.add_argument("--summary-md", required=True)
    parser.add_argument("--run-token", default=dt.datetime.utcnow().strftime("%Y%m%d%H%M%S"))
    args = parser.parse_args()

    body = Path(args.file).read_bytes()
    size_mib = len(body) / (1024 * 1024)
    bucket_prefix = safe_bucket_prefix(args.bucket_prefix)
    regions = [region.strip() for region in args.regions.split(",") if region.strip()]
    results: List[Dict[str, object]] = []

    for region in regions:
        bucket = make_bucket_name(bucket_prefix, region, args.run_token)
        object_key = "bench/20mb.bin"
        entry: dict[str, object] = {
            "region": region,
            "bucket": bucket,
            "result": "failed",
            "seconds": None,
            "mib_per_second": None,
            "note": "",
        }

        status, response = create_bucket(
            region=region,
            bucket=bucket,
            access_key=args.access_key,
            secret_key=args.secret_key,
            session_token=args.session_token,
            timeout_seconds=args.timeout_seconds,
        )
        if not (200 <= status < 300):
            entry["note"] = f"create bucket failed: {compact_xml_error(response) or status}"
            results.append(entry)
            continue

        started = time.perf_counter()
        status, response = put_object(
            region=region,
            bucket=bucket,
            key=object_key,
            body=body,
            access_key=args.access_key,
            secret_key=args.secret_key,
            session_token=args.session_token,
            timeout_seconds=args.timeout_seconds,
        )
        elapsed = round(time.perf_counter() - started, 3)
        cleanup_notes = cleanup_bucket(
            region=region,
            bucket=bucket,
            object_key=object_key,
            access_key=args.access_key,
            secret_key=args.secret_key,
            session_token=args.session_token,
            timeout_seconds=args.timeout_seconds,
        )

        if 200 <= status < 300:
            entry["result"] = "success"
            entry["seconds"] = elapsed
            entry["mib_per_second"] = round(size_mib / elapsed, 3) if elapsed > 0 else None
            entry["note"] = "; ".join(cleanup_notes) if cleanup_notes else "ok"
        else:
            failure_note = compact_xml_error(response) or str(status)
            all_notes = [f"upload failed: {failure_note}", *cleanup_notes]
            entry["note"] = "; ".join(note for note in all_notes if note)
        results.append(entry)

    with open(args.output_jsonl, "w", encoding="utf-8") as handle:
        for entry in results:
            handle.write(json.dumps(entry, ensure_ascii=True) + "\n")

    lines = [
        f"Runner: `{args.runner_label}`",
        "",
        f"Payload: `{size_mib:.1f} MiB`",
        "",
        "| Region | Result | Seconds | MiB/s | Note |",
        "|---|---|---:|---:|---|",
    ]
    for entry in results:
        seconds = "-" if entry["seconds"] is None else f"{entry['seconds']:.3f}"
        throughput = "-" if entry["mib_per_second"] is None else f"{entry['mib_per_second']:.3f}"
        lines.append(
            f"| `{entry['region']}` | {entry['result']} | {seconds} | {throughput} | {str(entry['note']).replace('|', '/')} |"
        )

    successes = [entry for entry in results if entry["result"] == "success" and entry["seconds"] is not None]
    successes.sort(key=lambda item: float(item["seconds"]))
    if successes:
        best = successes[0]
        lines.extend([
            "",
            f"Recommended region: `{best['region']}` ({best['seconds']:.3f}s, {best['mib_per_second']:.3f} MiB/s)",
        ])
        if len(successes) > 1:
            top = ", ".join(f"`{item['region']}` ({item['seconds']:.3f}s)" for item in successes[:5])
            lines.append(f"Top regions: {top}")
    else:
        lines.extend([
            "",
            "No region completed the 20 MiB upload successfully.",
        ])

    Path(args.summary_md).write_text("\n".join(lines) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
