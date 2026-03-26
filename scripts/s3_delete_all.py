#!/usr/bin/env python3
import argparse
import base64
import datetime as dt
import hashlib
import hmac
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from typing import Optional
from xml.sax.saxutils import escape


def sign(key_bytes: bytes, message: str) -> bytes:
    return hmac.new(key_bytes, message.encode("utf-8"), hashlib.sha256).digest()


def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def md5_base64(data: bytes) -> str:
    return base64.b64encode(hashlib.md5(data).digest()).decode("utf-8")


def region_candidates(endpoint: str, configured: str) -> list[str]:
    host = urllib.parse.urlparse(endpoint).hostname or ""
    items: list[str] = []

    def append_unique(*values: str) -> None:
        for value in values:
            item = value.strip()
            if item and item not in items:
                items.append(item)

    if host.endswith("r2.cloudflarestorage.com"):
        append_unique("auto")
    append_unique(configured or "us-east-1")
    if host.endswith("r2.cloudflarestorage.com"):
        append_unique("us-east-1")
    return items


def canonical_query(params: list[tuple[str, str]]) -> str:
    items = []
    for key, value in sorted(params, key=lambda pair: (pair[0], pair[1])):
        encoded_key = urllib.parse.quote(key, safe="-_.~")
        encoded_value = urllib.parse.quote(value, safe="-_.~")
        items.append(f"{encoded_key}={encoded_value}")
    return "&".join(items)


def send_signed_request(
    *,
    endpoint: str,
    bucket: str,
    method: str,
    params: list[tuple[str, str]],
    body: bytes,
    access_key: str,
    secret_key: str,
    region: str,
    content_type: Optional[str] = None,
    content_md5: Optional[str] = None,
    timeout_seconds: int,
) -> tuple[int, bytes]:
    parsed = urllib.parse.urlparse(endpoint)
    host = parsed.netloc
    amz_date = dt.datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    short_date = amz_date[:8]
    canonical_uri = f"/{urllib.parse.quote(bucket, safe='')}"
    payload_hash = sha256_hex(body)
    query_string = canonical_query(params)

    headers = [
        ("host", host),
        ("x-amz-content-sha256", payload_hash),
        ("x-amz-date", amz_date),
    ]
    if content_type:
        headers.append(("content-type", content_type))
    if content_md5:
        headers.append(("content-md5", content_md5))
    headers.sort(key=lambda item: item[0])

    canonical_headers = "".join(f"{key}:{value}\n" for key, value in headers)
    signed_headers = ";".join(key for key, _ in headers)
    canonical_request = "\n".join([
        method,
        canonical_uri,
        query_string,
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

    url = endpoint.rstrip("/") + canonical_uri
    if query_string:
        url += "?" + query_string

    request = urllib.request.Request(url, data=body if body else None, method=method)
    request.add_header("host", host)
    request.add_header("x-amz-content-sha256", payload_hash)
    request.add_header("x-amz-date", amz_date)
    request.add_header("Authorization", authorization)
    if content_type:
        request.add_header("content-type", content_type)
    if content_md5:
        request.add_header("content-md5", content_md5)

    try:
        with urllib.request.urlopen(request, timeout=timeout_seconds) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as error:
        return error.code, error.read()
    except urllib.error.URLError as error:
        raise RuntimeError(str(error.reason)) from error


def parse_xml_text(root: ET.Element, local_name: str) -> str:
    for element in root.iter():
        if element.tag.endswith(local_name):
            return (element.text or "").strip()
    return ""


def list_objects(endpoint: str, bucket: str, access_key: str, secret_key: str, region: str, continuation: str, timeout_seconds: int) -> tuple[list[str], str]:
    params = [("list-type", "2"), ("max-keys", "1000")]
    if continuation:
        params.append(("continuation-token", continuation))
    status, body = send_signed_request(
        endpoint=endpoint,
        bucket=bucket,
        method="GET",
        params=params,
        body=b"",
        access_key=access_key,
        secret_key=secret_key,
        region=region,
        timeout_seconds=timeout_seconds,
    )
    if not (200 <= status < 300):
        raise RuntimeError(f"list objects failed: status={status} body={body[:400].decode('utf-8', 'ignore')}")
    root = ET.fromstring(body)
    keys: list[str] = []
    for element in root.iter():
        if element.tag.endswith("Key") and element.text:
            keys.append(element.text)
    is_truncated = parse_xml_text(root, "IsTruncated").lower() == "true"
    next_token = parse_xml_text(root, "NextContinuationToken") if is_truncated else ""
    return keys, next_token


def delete_objects(endpoint: str, bucket: str, access_key: str, secret_key: str, region: str, keys: list[str], timeout_seconds: int) -> None:
    payload = (
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        "<Delete>"
        + "".join(f"<Object><Key>{escape(key)}</Key></Object>" for key in keys)
        + "</Delete>"
    ).encode("utf-8")
    status, body = send_signed_request(
        endpoint=endpoint,
        bucket=bucket,
        method="POST",
        params=[("delete", "")],
        body=payload,
        access_key=access_key,
        secret_key=secret_key,
        region=region,
        content_type="application/xml",
        content_md5=md5_base64(payload),
        timeout_seconds=timeout_seconds,
    )
    if not (200 <= status < 300):
        raise RuntimeError(f"delete objects failed: status={status} body={body[:400].decode('utf-8', 'ignore')}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--endpoint", required=True)
    parser.add_argument("--bucket", required=True)
    parser.add_argument("--access-key", required=True)
    parser.add_argument("--secret-key", required=True)
    parser.add_argument("--region", default="auto")
    parser.add_argument("--timeout-seconds", type=int, default=300)
    args = parser.parse_args()

    deleted_total = 0
    last_error: Optional[Exception] = None
    for region in region_candidates(args.endpoint, args.region):
        deleted_total = 0
        try:
            while True:
                keys, continuation = list_objects(
                    endpoint=args.endpoint,
                    bucket=args.bucket,
                    access_key=args.access_key,
                    secret_key=args.secret_key,
                    region=region,
                    continuation="",
                    timeout_seconds=args.timeout_seconds,
                )
                if not keys:
                    break
                delete_objects(
                    endpoint=args.endpoint,
                    bucket=args.bucket,
                    access_key=args.access_key,
                    secret_key=args.secret_key,
                    region=region,
                    keys=keys,
                    timeout_seconds=args.timeout_seconds,
                )
                deleted_total += len(keys)
                print(f"deleted {deleted_total} objects using region={region}", file=sys.stderr)
            print(f"purge completed: deleted {deleted_total} objects", file=sys.stderr)
            return 0
        except Exception as error:  # noqa: BLE001
            last_error = error
            print(f"purge attempt failed for region={region}: {error}", file=sys.stderr)

    print(f"purge failed: {last_error}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
