#!/usr/bin/env python3
"""Download 20 random cat images (label == 0) from microsoft/cats_vs_dogs.

Streams the parquet shards, samples cat rows with a fixed seed, and writes
JPEGs into assets/cats/. Re-run to reproduce the exact same 20 cats.
"""
import io
import os
import random

import pandas as pd
from huggingface_hub import hf_hub_download
from PIL import Image

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "cats")
REPO = "microsoft/cats_vs_dogs"
SHARDS = [
    "data/train-00000-of-00002.parquet",
    "data/train-00001-of-00002.parquet",
]
SAMPLE_SIZE = 20
SEED = 1337


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    rng = random.Random(SEED)

    counter = 0
    for shard_idx, shard in enumerate(SHARDS):
        path = hf_hub_download(REPO, shard, repo_type="dataset")
        df = pd.read_parquet(path, columns=["image", "labels"])
        cats = df[df["labels"] == 0]
        print(f"{shard}: {len(cats)} cats out of {len(df)} rows")
        sample = cats.sample(n=SAMPLE_SIZE // len(SHARDS), random_state=rng.randint(0, 2**31))
        for _, row in sample.iterrows():
            img = Image.open(io.BytesIO(row["image"]["bytes"])).convert("RGB")
            img.thumbnail((512, 512))
            out = os.path.join(OUT_DIR, f"cat-{counter:02d}.jpg")
            img.save(out, "JPEG", quality=88)
            print("wrote", out, img.size)
            counter += 1


if __name__ == "__main__":
    main()
