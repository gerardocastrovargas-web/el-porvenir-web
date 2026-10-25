import os
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

src_dir = Path(r"C:\Users\usuar\.gemini\antigravity-ide\brain\7c300bd4-ecd3-45a6-ab54-54858a01afa7\.user_uploaded")
out_dir = Path(r"C:\Users\usuar\.gemini\antigravity-ide\brain\7c300bd4-ecd3-45a6-ab54-54858a01afa7\scratch\enhanced")
out_dir.mkdir(parents=True, exist_ok=True)

def enhance_portal(img_path):
    im = Image.open(img_path)
    # Crop dark eaves at top (y=80 to bottom)
    im = im.crop((0, 80, im.width, im.height))
    H, W = im.height, im.width
    arr = np.array(im, dtype=np.float32) / 255.0

    # Luminance map (H, W)
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    y_coords = np.arange(H, dtype=np.float32).reshape(H, 1) # (H, 1)

    # 1. Sky enhancement (y from 0 to 415 in cropped image)
    # Horizon is around y=415
    sky_grad = np.clip((415.0 - y_coords) / 250.0, 0.0, 1.0) # (H, 1)
    
    # Target sky colors from overlook.jpg:
    top_sky = np.array([105.0 / 255.0, 150.0 / 255.0, 205.0 / 255.0], dtype=np.float32)
    horizon_sky = np.array([160.0 / 255.0, 192.0 / 255.0, 218.0 / 255.0], dtype=np.float32)
    t = np.clip(y_coords / 415.0, 0.0, 1.0) # (H, 1)
    ideal_sky = (1.0 - t)[:, :, None] * top_sky + t[:, :, None] * horizon_sky # (H, 1, 3)

    # Open sky mask: above horizon and not dark wooden posts (lum > 0.40)
    open_sky_mask = (y_coords < 415) & (lum > 0.40) # (H, W)
    # Cloud highlights: where lum > 0.65, preserve natural cloud texture
    cloud_weight = np.clip((lum - 0.65) / 0.22, 0.0, 1.0)[:, :, None] # (H, W, 1)
    blend_sky = (1.0 - cloud_weight * 0.65) * ideal_sky + (cloud_weight * 0.65) * arr
    
    sky_strength = (sky_grad[:, :] * 0.60)[:, :, None] * open_sky_mask[:, :, None]
    arr = (1.0 - sky_strength) * arr + sky_strength * blend_sky

    # 2. Sea enhancement (y between 415 and 485)
    sea_mask = (y_coords >= 415) & (y_coords <= 485) # (H, 1)
    sea_adj = arr.copy()
    sea_adj[:, :, 0] = sea_adj[:, :, 0] * 0.86 # reduce gray/red
    sea_adj[:, :, 1] = np.clip(sea_adj[:, :, 1] * 1.10, 0.0, 1.0) # emerald
    sea_adj[:, :, 2] = np.clip(sea_adj[:, :, 2] * 1.18, 0.0, 1.0) # azure
    arr = np.where(sea_mask[:, :, None], sea_adj, arr)

    # 3. Sand and shadow lift (y > 480)
    sand_mask = np.clip((y_coords - 480.0) / 400.0, 0.0, 1.0) # (H, 1)
    shadow_lift = 0.26 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + shadow_lift * sand_mask[:, :, None]

    # Warm golden tone for the desert sand (match overlook.jpg)
    arr[:, :, 0] = np.clip(arr[:, :, 0] * (1.0 + 0.08 * sand_mask[:, :]), 0.0, 1.0)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * (1.0 + 0.03 * sand_mask[:, :]), 0.0, 1.0)

    im_out = Image.fromarray((np.clip(arr, 0.0, 1.0) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.22)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.10)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=2))
    return im_out

def enhance_overlook(img_path):
    im = Image.open(img_path)
    arr = np.array(im, dtype=np.float32) / 255.0

    # Subtle shadow lift in the sand foreground
    lift = 0.12 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    # Deepen the blue sky and sea vibrance, warm the sand
    im_out = Image.fromarray((np.clip(arr, 0.0, 1.0) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.24)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.12)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    return im_out

def enhance_cactus(img_path):
    im = Image.open(img_path)
    arr = np.array(im, dtype=np.float32) / 255.0
    H, W = im.height, im.width
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    y_coords = np.arange(H, dtype=np.float32).reshape(H, 1)

    # 1. Sky enhancement (y from 0 to 180)
    sky_grad = np.clip((180.0 - y_coords) / 160.0, 0.0, 1.0) # (H, 1)
    top_sky = np.array([115.0 / 255.0, 160.0 / 255.0, 215.0 / 255.0], dtype=np.float32)
    horizon_sky = np.array([170.0 / 255.0, 198.0 / 255.0, 222.0 / 255.0], dtype=np.float32)
    t = np.clip(y_coords / 180.0, 0.0, 1.0)
    ideal_sky = (1.0 - t)[:, :, None] * top_sky + t[:, :, None] * horizon_sky

    # Open sky mask (exclude dark posts/beams/roofs lum < 0.55)
    open_sky = (y_coords < 180) & (lum > 0.50) # (H, W)
    cloud_weight = np.clip((lum - 0.65) / 0.22, 0.0, 1.0)[:, :, None]
    blend_sky = (1.0 - cloud_weight * 0.65) * ideal_sky + (cloud_weight * 0.65) * arr
    sky_strength = (sky_grad[:, :] * 0.55)[:, :, None] * open_sky[:, :, None]
    arr = (1.0 - sky_strength) * arr + sky_strength * blend_sky

    # 2. Lift overcast shadow & bring out sunlit warmth on sand and terracotta
    lift = 0.18 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    # Warmth
    arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.06 + 0.015, 0.0, 1.0)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * 1.03 + 0.005, 0.0, 1.0)

    im_out = Image.fromarray((np.clip(arr, 0.0, 1.0) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.28)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.12)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    return im_out

def enhance_huts(img_path):
    im = Image.open(img_path)
    arr = np.array(im, dtype=np.float32) / 255.0
    H, W = im.height, im.width
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    y_coords = np.arange(H, dtype=np.float32).reshape(H, 1)

    # 1. Sky enhancement (y from 0 to 320)
    sky_grad = np.clip((320.0 - y_coords) / 280.0, 0.0, 1.0)
    top_sky = np.array([115.0 / 255.0, 160.0 / 255.0, 215.0 / 255.0], dtype=np.float32)
    horizon_sky = np.array([170.0 / 255.0, 198.0 / 255.0, 222.0 / 255.0], dtype=np.float32)
    t = np.clip(y_coords / 320.0, 0.0, 1.0)
    ideal_sky = (1.0 - t)[:, :, None] * top_sky + t[:, :, None] * horizon_sky

    # Exclude the huts (thatch and white dome)
    open_sky = (y_coords < 320) & (lum > 0.60) & (arr[:, :, 0] > 0.5) # (H, W)
    cloud_weight = np.clip((lum - 0.68) / 0.22, 0.0, 1.0)[:, :, None]
    blend_sky = (1.0 - cloud_weight * 0.65) * ideal_sky + (cloud_weight * 0.65) * arr
    sky_strength = (sky_grad[:, :] * 0.50)[:, :, None] * open_sky[:, :, None]
    arr = (1.0 - sky_strength) * arr + sky_strength * blend_sky

    # 2. Lift shadows on dunes and huts
    lift = 0.16 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    # Warm sunlight
    arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.05 + 0.015, 0.0, 1.0)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * 1.02 + 0.005, 0.0, 1.0)

    im_out = Image.fromarray((np.clip(arr, 0.0, 1.0) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.24)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.12)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    return im_out

if __name__ == "__main__":
    p1 = enhance_portal(src_dir / "media_1792956554120.jpg")
    p2 = enhance_overlook(src_dir / "media_1792956554140.jpg")
    p3 = enhance_cactus(src_dir / "media_1792956554201.jpg")
    p4 = enhance_huts(src_dir / "media_1792956554216.jpg")

    p1.save(out_dir / "portal_graded.jpg", quality=95)
    p2.save(out_dir / "overlook_graded.jpg", quality=95)
    p3.save(out_dir / "cactus_graded.jpg", quality=95)
    p4.save(out_dir / "huts_graded.jpg", quality=95)
    print("All 4 graded images successfully generated!")
