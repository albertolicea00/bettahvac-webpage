"""
Convert one or more images to optimized WebP.

Local dev tool — not part of the build pipeline. Use:

    python3 scripts/convert_to_webp.py path/to/img.avif [more.img ...]
    python3 scripts/convert_to_webp.py --quality 70 path/to/img.png
    python3 scripts/convert_to_webp.py --lossless path/to/transparent.png
    python3 scripts/convert_to_webp.py --out-dir public/assets/img in/source.png

Defaults: WebP quality 78, lossy, method 6 (slowest = best compression).
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

SUPPORTED_INPUTS = {".avif", ".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"}


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Convert images to optimized WebP.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument(
        "inputs",
        nargs="+",
        type=Path,
        help="Image files to convert (avif/png/jpg/jpeg/webp/bmp/tiff).",
    )
    p.add_argument(
        "-o",
        "--out-dir",
        type=Path,
        default=None,
        help="Output directory. Defaults to each input's own directory.",
    )
    p.add_argument(
        "--suffix",
        default=".webp",
        help="Output file extension.",
    )
    p.add_argument(
        "-q",
        "--quality",
        type=int,
        default=78,
        help="WebP quality (1-100). Ignored if --lossless.",
    )
    p.add_argument(
        "--lossless",
        action="store_true",
        help="Use lossless WebP. Recommended for transparency / crisp art.",
    )
    p.add_argument(
        "--method",
        type=int,
        default=6,
        choices=range(0, 7),
        help="WebP encoder effort (0=fast, 6=slowest/best).",
    )
    p.add_argument(
        "--keep-alpha",
        action="store_true",
        default=True,
        help="Preserve alpha channel when present.",
    )
    p.add_argument(
        "--no-keep-alpha",
        dest="keep_alpha",
        action="store_false",
    )
    p.add_argument(
        "-f",
        "--force",
        action="store_true",
        help="Overwrite output if it already exists.",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be done without writing files.",
    )
    return p.parse_args(argv)


def convert_one(
    src: Path,
    out_dir: Path | None,
    suffix: str,
    opts: dict,
    force: bool,
) -> Path:
    if not src.exists():
        raise FileNotFoundError(src)
    if src.suffix.lower() not in SUPPORTED_INPUTS:
        raise ValueError(f"unsupported input format: {src}")

    dst_dir = out_dir or src.parent
    dst = dst_dir / f"{src.stem}{suffix}"

    if dst.exists() and not force:
        raise FileExistsError(f"{dst} exists (use --force to overwrite)")

    img = Image.open(src)
    if "A" in img.getbands() and opts.get("_keep_alpha", True):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")

    clean_opts = {k: v for k, v in opts.items() if not k.startswith("_")}
    img.save(dst, "WEBP", **clean_opts)
    return dst


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    webp_opts: dict = {
        "method": args.method,
        "_keep_alpha": args.keep_alpha,
    }
    if args.lossless:
        webp_opts["lossless"] = True
    else:
        webp_opts["quality"] = args.quality

    if args.out_dir and not args.dry_run:
        args.out_dir.mkdir(parents=True, exist_ok=True)

    failures = 0
    for src in args.inputs:
        try:
            if args.dry_run:
                dst_dir = args.out_dir or src.parent
                dst = dst_dir / f"{src.stem}{args.suffix}"
                print(f"[dry-run] {src} -> {dst}  {webp_opts}")
                continue
            dst = convert_one(
                src=src,
                out_dir=args.out_dir,
                suffix=args.suffix,
                opts=webp_opts,
                force=args.force,
            )
            src_size = src.stat().st_size
            dst_size = dst.stat().st_size
            saving = (src_size - dst_size) * 100 / src_size
            print(
                f"{src.name} -> {dst.name}: "
                f"{src_size / 1024:.1f}KB -> {dst_size / 1024:.1f}KB "
                f"({saving:+.1f}%)"
            )
        except Exception as e:  # surface error and keep going
            failures += 1
            print(f"FAIL {src}: {e}", file=sys.stderr)

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
