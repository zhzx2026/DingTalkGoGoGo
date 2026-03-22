#!/usr/bin/env python3
import argparse
import json
import time
import urllib.parse
from pathlib import Path

from s3_put import put_object


def compact_text(text: str) -> str:
    return " ".join((text or "").strip().split())[:220]


def write_outputs(output_json: str, summary_md: str, row: dict) -> None:
    Path(output_json).write_text(json.dumps(row, ensure_ascii=True) + "\n", encoding="utf-8")
    seconds = "-" if row["seconds"] is None else f"{row['seconds']:.3f}"
    throughput = "-" if row["mib_per_second"] is None else f"{row['mib_per_second']:.3f}"
    lines = [
        f"Target host: `{row['target']}`",
        "",
        "| Region | Result | Seconds | MiB/s | Note |",
        "|---|---|---:|---:|---|",
        f"| `{row['region']}` | {row['result']} | {seconds} | {throughput} | {str(row['note']).replace('|', '/')} |",
    ]
    Path(summary_md).write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--endpoint", required=True)
    parser.add_argument("--bucket", required=True)
    parser.add_argument("--key", required=True)
    parser.add_argument("--file", required=True)
    parser.add_argument("--access-key", required=True)
    parser.add_argument("--secret-key", required=True)
    parser.add_argument("--region", required=True)
    parser.add_argument("--timeout-seconds", type=int, default=30)
    parser.add_argument("--output-json", required=True)
    parser.add_argument("--summary-md", required=True)
    args = parser.parse_args()

    body = Path(args.file).read_bytes()
    host = urllib.parse.urlparse(args.endpoint).hostname or ""
    size_mib = len(body) / (1024 * 1024)
    started = time.perf_counter()

    row = {
        "mode": "signing-region",
        "region": args.region,
        "target": host,
        "result": "failed",
        "seconds": None,
        "mib_per_second": None,
        "note": "",
    }

    last_status = 0
    last_body = ""
    for unsigned_payload in (False, True):
        status, response_body = put_object(
            endpoint=args.endpoint,
            bucket=args.bucket,
            key=args.key,
            body=body,
            content_type="application/octet-stream",
            access_key=args.access_key,
            secret_key=args.secret_key,
            region=args.region,
            unsigned_payload=unsigned_payload,
            timeout_seconds=max(1, args.timeout_seconds),
        )
        if 200 <= status < 300:
            elapsed = round(time.perf_counter() - started, 3)
            mode = "unsigned" if unsigned_payload else "hashed"
            row["result"] = "success"
            row["seconds"] = elapsed
            row["mib_per_second"] = round(size_mib / elapsed, 3) if elapsed > 0 else None
            row["note"] = f"uploaded via region={args.region} payload={mode}"
            write_outputs(args.output_json, args.summary_md, row)
            return 0
        last_status = status
        last_body = response_body

    elapsed = round(time.perf_counter() - started, 3)
    row["seconds"] = elapsed
    row["note"] = f"upload failed: status={last_status} body={compact_text(last_body)}"
    write_outputs(args.output_json, args.summary_md, row)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
