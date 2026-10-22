"""Render the app icon: the Minecraft gold-ingot sprite.

Source of truth is the 16x16 grid extracted from the reference sprite, so the
art is reproduced exactly rather than approximated. Transparent background.

Outputs (all from the same grid, nearest-neighbour so edges stay crisp):
  desktop/build/icon.png      1024x1024  macOS / general app icon
  desktop/build/icon.ico      256/128/64/48/32/16  Windows build icon
  prefs/icon-source-16.png    16x16      the literal pixel grid, for reference
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "desktop" / "build"
OUT_REF = ROOT / "assets" / "generated" / "icon-reference"

# Palette indices 1-7 from the reference sprite; index 0 is its white backdrop,
# which becomes transparent here.
PALETTE = {
    1: (178, 100, 17),  # deep gold shadow / outline
    2: (250, 214, 74),  # mid gold
    3: (253, 245, 95),  # bright gold highlight
    4: (117, 40, 2),  # darkest brown edge
    5: (255, 253, 224),  # near-white specular glint
    6: (220, 150, 19),  # darker gold body
    7: (233, 177, 21),  # gold body
}

# The 16x16 grid, transcribed from the extracted sprite. '.' = transparent.
GRID = [
    "................",
    "................",
    "..........11....",
    ".......111221...",
    "....1113333331..",
    ".11123333333324.",
    "1533333333335534",
    "1253333335553624",
    "1235335553766624",
    "1232.53766667224",
    "173237666672244.",
    ".172376677444...",
    "..17277444......",
    "...1144.........",
    "................",
    "................",
]


def build_source() -> Image.Image:
    """The 16x16 RGBA sprite."""
    if len(GRID) != 16 or any(len(row) != 16 for row in GRID):
        raise SystemExit("GRID must be exactly 16x16")
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    px = img.load()
    for y, row in enumerate(GRID):
        for x, ch in enumerate(row):
            if ch == ".":
                continue
            px[x, y] = (*PALETTE[int(ch, 16)], 255)
    return img


def upscale(src: Image.Image, size: int, pad_ratio: float = 0.0) -> Image.Image:
    """Nearest-neighbour upscale, optionally inset inside a transparent square.

    pad_ratio keeps the sprite off the very edge of the canvas: macOS applies a
    squircle mask and a full-bleed sprite can look clipped.
    """
    inner = max(1, int(round(size * (1 - 2 * pad_ratio))))
    scaled = src.resize((inner, inner), Image.NEAREST)
    if pad_ratio <= 0:
        return scaled
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    off = (size - inner) // 2
    canvas.paste(scaled, (off, off), scaled)
    return canvas


def main() -> None:
    src = build_source()
    OUT_REF.mkdir(parents=True, exist_ok=True)
    src.resize((256, 256), Image.NEAREST).save(OUT_REF / "ingot-sprite-16x16.png")
    src.save(OUT_REF / "ingot-sprite-16px.png")

    # App icon: small inset so the macOS squircle mask does not clip the flanks.
    icon = upscale(src, 1024, pad_ratio=0.06)
    icon.save(BUILD / "icon.png")
    print(f"wrote {BUILD / 'icon.png'} {icon.size}")

    # Windows .ico with the sizes Windows actually picks from.
    ico_sizes = [256, 128, 64, 48, 32, 16]
    frames = [upscale(src, s, pad_ratio=0.04) for s in ico_sizes]
    frames[0].save(
        BUILD / "icon.ico",
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
        append_images=frames[1:],
    )
    print(f"wrote {BUILD / 'icon.ico'} sizes={ico_sizes}")

    # A standalone .ico for Windows shortcuts. Shell shortcuts reference an icon
    # by path, and the dev launcher shortcut pointed at node.exe — the script's
    # interpreter — so it showed Node's logo instead of this app's mark.
    shortcut_ico = ROOT / "assets" / "generated" / "xiaojin-agent.ico"
    shortcut_ico.parent.mkdir(parents=True, exist_ok=True)
    shortcut_ico.write_bytes((BUILD / "icon.ico").read_bytes())
    print(f"wrote {shortcut_ico} sizes={ico_sizes}")


if __name__ == "__main__":
    main()
