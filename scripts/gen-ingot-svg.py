"""Emit the ingot sprite as run-merged SVG rectangles.

Horizontally contiguous same-colour pixels are merged into one <rect>, which is
exactly equivalent to drawing 256 individual pixels but far smaller. Prints the
rows for direct pasting, and also reports the artwork bounding box so the
viewBox can be centred without clipping.
"""

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

# The reference sprite's own 8-colour palette (index -> RGB).
PALETTE = {
    1: (178, 100, 17),
    2: (250, 214, 74),
    3: (253, 245, 95),
    4: (117, 40, 2),
    5: (255, 253, 224),
    6: (220, 150, 19),
    7: (233, 177, 21),
}


def merged_runs(row: str):
    """Yield (start_x, width, colour_index) for one row."""
    x = 0
    while x < len(row):
        ch = row[x]
        if ch == ".":
            x += 1
            continue
        run = 1
        while x + run < len(row) and row[x + run] == ch:
            run += 1
        yield x, run, int(ch, 16)
        x += run


def main() -> None:
    rects = 0
    for y, row in enumerate(GRID):
        for x, width, colour in merged_runs(row):
            print(
                f'    <rect class="px{colour}" x="{x}" y="{y}" '
                f'width="{width}" height="1" />'
            )
            rects += 1

    xs = [x for row in GRID for x, ch in enumerate(row) if ch != "."]
    ys = [y for y, row in enumerate(GRID) for ch in row if ch != "."]
    print()
    print(f"// rects: {rects}")
    print(f"// bounds: x {min(xs)}..{max(xs)}  y {min(ys)}..{max(ys)}")
    print(f"// artwork: {max(xs)-min(xs)+1} x {max(ys)-min(ys)+1}")
    print(f"// colours used: {sorted({int(c,16) for row in GRID for c in row if c != '.'})}")
    assert all(int(c, 16) in PALETTE for row in GRID for c in row if c != ".")


if __name__ == "__main__":
    main()
