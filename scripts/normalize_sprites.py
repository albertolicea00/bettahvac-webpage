"""
Normalize the generated sprites so hot and cold variants share the same
canvas + content bounding box. Without this they render at different
sizes in the Services grid (hot is square 500x500, cold is 669x373).

We pick a common canvas (square 700x700) and recenter each sprite's
visible content inside it. This way `object-fit: contain` renders both
variants at the same on-screen size.
"""

from pathlib import Path
from PIL import Image

ROOT = Path("/Users/albertolicea00/Develop/bettahvac-web/public/assets/generated")
CANVAS = 700  # square output canvas, plenty of room for the 3D sprites
PADDING = 30  # px of empty space around the recentered content


def normalize(src: Path) -> None:
    img = Image.open(src).convert("RGBA")
    bbox = img.getbbox()
    if not bbox:
        print(f"{src.name}: empty image, skipping")
        return

    # Crop to the content bbox.
    cropped = img.crop(bbox)
    cw, ch = cropped.size

    # Scale to fit in (CANVAS - 2*PADDING) keeping aspect ratio.
    max_dim = CANVAS - 2 * PADDING
    scale = min(max_dim / cw, max_dim / ch, 1.0)
    new_w = max(1, round(cw * scale))
    new_h = max(1, round(ch * scale))
    scaled = cropped.resize((new_w, new_h), Image.LANCZOS)

    # Paste centered on a transparent canvas.
    canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    off_x = (CANVAS - new_w) // 2
    off_y = (CANVAS - new_h) // 2
    canvas.paste(scaled, (off_x, off_y), scaled)

    canvas.save(src, "WEBP", lossless=True, method=6, exact=True)
    print(f"{src.name}: -> {CANVAS}x{CANVAS}, content scaled to {new_w}x{new_h}")


def main() -> None:
    for src in sorted(ROOT.glob("sprite-*.webp")):
        normalize(src)


if __name__ == "__main__":
    main()
