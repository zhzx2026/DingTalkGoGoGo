#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
from typing import List


def load_rows(input_dir: str) -> List[dict]:
    rows: List[dict] = []
    for path in sorted(Path(input_dir).glob("*")):
        if path.suffix not in (".json", ".jsonl"):
            continue
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", required=True)
    parser.add_argument("--mode", required=True)
    parser.add_argument("--payload-mib", required=True)
    parser.add_argument("--runner-label", required=True)
    parser.add_argument("--target", required=True)
    parser.add_argument("--summary-md", required=True)
    parser.add_argument("--output-jsonl", required=True)
    args = parser.parse_args()

    rows = load_rows(args.input_dir)
    rows.sort(key=lambda row: (row.get("result") != "success", row.get("seconds") is None, row.get("seconds") or 0, row.get("region") or ""))

    with open(args.output_jsonl, "w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=True) + "\n")

    target_label = args.target or ("AWS S3 regional endpoints" if args.mode == "aws-region-upload" else "configured S3 endpoint")
    lines = [
        f"Runner: `{args.runner_label}`",
        "",
        f"Mode: `{args.mode}`",
        "",
        f"Payload: `{args.payload_mib} MiB`",
        "",
        f"Target: `{target_label}`",
        "",
        "| Region | Result | Seconds | MiB/s | Note |",
        "|---|---|---:|---:|---|",
    ]

    for row in rows:
        seconds = "-" if row.get("seconds") is None else f"{row['seconds']:.3f}"
        throughput = "-" if row.get("mib_per_second") is None else f"{row['mib_per_second']:.3f}"
        lines.append(
            f"| `{row['region']}` | {row['result']} | {seconds} | {throughput} | {str(row.get('note', '')).replace('|', '/')} |"
        )

    successes = [row for row in rows if row.get("result") == "success" and row.get("seconds") is not None]
    if successes:
        best = min(successes, key=lambda row: row["seconds"])
        lines.extend([
            "",
            f"Recommended region: `{best['region']}` ({best['seconds']:.3f}s, {best['mib_per_second']:.3f} MiB/s)",
        ])
        top = ", ".join(f"`{row['region']}` ({row['seconds']:.3f}s)" for row in successes[:5])
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
