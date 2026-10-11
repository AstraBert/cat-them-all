#!/usr/bin/env python3
"""Generate 20 meme-cat asset images (PNG) into assets/cats/.

Each image is a flat, cartoonish cat drawn with Pillow primitives, tinted
with the meme's signature color, with the cat's name in a meme-style caption.
"""
import os
import random

from PIL import Image, ImageDraw, ImageFont

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "cats")
SIZE = 512

CATS = [
    ("grumpy-cat", "GRUMPY CAT", "#8d6e63", "NO."),
    ("nyan-cat", "NYAN CAT", "#7ec8e3", "NYAN NYAN NYAN"),
    ("keyboard-cat", "KEYBOARD CAT", "#5c6bc0", "PLAY HIM OFF!"),
    ("longcat", "LONGCAT", "#b0bec5", "SO LONG"),
    ("ceiling-cat", "CEILING CAT", "#a1887f", "IS WATCHING U"),
    ("basement-cat", "BASEMENT CAT", "#37474f", "IS IN UR BASEMENT"),
    ("business-cat", "BUSINESS CAT", "#455a64", "SYNERGY, MEOW"),
    ("chemistry-cat", "CHEMISTRY CAT", "#00897b", "PERIODIC PUNS"),
    ("hipster-kitty", "HIPSTER KITTY", "#7cb342", "LIKED IT FIRST"),
    ("serious-cat", "SERIOUS CAT", "#78909c", "I AM SERIOUS"),
    ("limecat", "LIMECAT", "#9ccc65", "NOT AMUSED"),
    ("monorail-cat", "MONORAIL CAT", "#ffb300", "ALL ABOARD"),
    ("surprised-cat", "SURPRISED CAT", "#ff8a65", "O RLY?"),
    ("polite-cat", "POLITE CAT", "#ba68c8", "HE LOOKS POLITE"),
    ("vibing-cat", "VIBING CAT", "#4db6ac", "JUST VIBES"),
    ("sad-cat", "SAD CAT", "#64b5f6", "OK I PULL UP"),
    ("banana-cat", "BANANA CAT", "#fdd835", "CRYING IN BANANA"),
    ("smurf-cat", "SMURF CAT", "#1e88e5", "WE LIVE WE LOVE"),
    ("maxwell", "MAXWELL", "#546e7a", "SPIN TO WIN"),
    ("pop-cat", "POP CAT", "#ef5350", "POP POP POP"),
]

BG_COLORS = ["#fff3e0", "#e3f2fd", "#f3e5f5", "#e8f5e9", "#fffde7", "#fce4ec"]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Impact.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def hex_to_rgb(h: str):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def lighten(rgb, factor=0.6):
    return tuple(int(c + (255 - c) * factor) for c in rgb)


def draw_cat(draw: ImageDraw.ImageDraw, cx: int, cy: int, r: int, color, seed: int):
    rng = random.Random(seed)
    light = lighten(color, 0.55)
    dark = tuple(max(0, c - 60) for c in color)
    outline = (40, 32, 28)

    # Tail
    tail_side = rng.choice([-1, 1])
    tx = cx + tail_side * int(r * 1.05)
    draw.line(
        [(tx, cy + r // 2), (tx + tail_side * r // 2, cy - r // 3)],
        fill=outline,
        width=r // 7,
    )
    draw.line(
        [(tx, cy + r // 2), (tx + tail_side * r // 2, cy - r // 3)],
        fill=color,
        width=r // 9,
    )

    # Body
    body_box = [cx - r, cy - r // 4, cx + r, cy + r]
    draw.ellipse(body_box, fill=color, outline=outline, width=6)
    belly = [cx - r * 2 // 3, cy + r // 8, cx + r * 2 // 3, cy + r]
    draw.ellipse(belly, fill=light)

    # Head
    head_r = int(r * 0.78)
    hy = cy - int(r * 0.72)
    head_box = [cx - head_r, hy - head_r, cx + head_r, hy + head_r]

    # Ears
    ear_w = int(head_r * 0.52)
    ear_h = int(head_r * 0.72)
    for side in (-1, 1):
        ex = cx + side * int(head_r * 0.62)
        points = [
            (ex - ear_w // 2, hy - head_r // 3),
            (ex + ear_w // 2, hy - head_r // 3),
            (ex + side * ear_w // 6, hy - head_r // 3 - ear_h),
        ]
        draw.polygon(points, fill=color, outline=outline)
        inner = [
            (ex - ear_w // 4, hy - head_r // 3 - 6),
            (ex + ear_w // 4, hy - head_r // 3 - 6),
            (ex + side * ear_w // 8, hy - head_r // 3 - ear_h + 12),
        ]
        draw.polygon(inner, fill=(255, 183, 197))

    draw.ellipse(head_box, fill=color, outline=outline, width=6)

    # Eyes
    eye_dx = int(head_r * 0.42)
    eye_y = hy - int(head_r * 0.12)
    eye_r = max(6, head_r // 7)
    for side in (-1, 1):
        ex = cx + side * eye_dx
        draw.ellipse(
            [ex - eye_r, eye_y - eye_r, ex + eye_r, eye_y + eye_r],
            fill=(255, 255, 255),
            outline=outline,
            width=3,
        )
        pupil_r = eye_r // 2
        draw.ellipse(
            [ex - pupil_r, eye_y - pupil_r, ex + pupil_r, eye_y + pupil_r],
            fill=outline,
        )
        glint = pupil_r // 2 + 1
        draw.ellipse(
            [ex - glint, eye_y - pupil_r, ex, eye_y - pupil_r + glint],
            fill=(255, 255, 255),
        )

    # Nose + mouth
    nose_w = head_r // 6
    nose_y = hy + int(head_r * 0.22)
    draw.polygon(
        [
            (cx - nose_w, nose_y),
            (cx + nose_w, nose_y),
            (cx, nose_y + nose_w),
        ],
        fill=(235, 120, 140),
        outline=outline,
    )
    draw.arc(
        [cx - nose_w * 2, nose_y + nose_w // 2, cx, nose_y + nose_w * 2],
        start=0,
        end=90,
        fill=outline,
        width=4,
    )
    draw.arc(
        [cx, nose_y + nose_w // 2, cx + nose_w * 2, nose_y + nose_w * 2],
        start=90,
        end=180,
        fill=outline,
        width=4,
    )

    # Whiskers
    whisk_y = hy + int(head_r * 0.25)
    for side in (-1, 1):
        for i, dy in enumerate((-8, 4, 16)):
            x0 = cx + side * int(head_r * 0.55)
            x1 = cx + side * int(head_r * 1.25)
            draw.line(
                [(x0, whisk_y + dy // 2), (x1, whisk_y + dy)],
                fill=dark,
                width=3,
            )

    # Paws
    paw_r = r // 5
    for side in (-1, 1):
        px = cx + side * int(r * 0.45)
        py = cy + r - paw_r // 2
        draw.ellipse(
            [px - paw_r, py - paw_r, px + paw_r, py + paw_r],
            fill=light,
            outline=outline,
            width=4,
        )


def draw_caption(draw: ImageDraw.ImageDraw, text: str, y: int, font, fill=(30, 30, 30)):
    bbox = draw.textbbox((0, 0), text, font=font, stroke_width=2)
    w = bbox[2] - bbox[0]
    draw.text(
        ((SIZE - w) / 2, y),
        text,
        font=font,
        fill=fill,
        stroke_width=2,
        stroke_fill=(255, 255, 255),
    )


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    title_font = load_font(44)
    tag_font = load_font(30)

    for i, (slug, name, color_hex, tagline) in enumerate(CATS):
        img = Image.new("RGB", (SIZE, SIZE), BG_COLORS[i % len(BG_COLORS)])
        draw = ImageDraw.Draw(img)
        color = hex_to_rgb(color_hex)

        # Decorative circles
        rng = random.Random(i * 7 + 1)
        for _ in range(6):
            r = rng.randint(18, 48)
            x = rng.randint(0, SIZE)
            y = rng.randint(0, SIZE)
            draw.ellipse([x - r, y - r, x + r, y + r], fill=lighten(color, 0.8))

        draw_cat(draw, SIZE // 2, SIZE // 2 + 30, 130, color, seed=i * 13 + 5)
        draw_caption(draw, name, 18, title_font)
        draw_caption(draw, tagline, SIZE - 58, tag_font, fill=(90, 60, 40))

        path = os.path.join(OUT_DIR, f"{slug}.png")
        img.save(path, "PNG")
        print("wrote", path)


if __name__ == "__main__":
    main()
