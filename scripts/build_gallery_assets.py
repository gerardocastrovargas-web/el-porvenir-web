from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

src_dir = Path(r"C:\Users\usuar\.gemini\antigravity-ide\brain\7c300bd4-ecd3-45a6-ab54-54858a01afa7\.user_uploaded")
out_dir = Path("public/assets")
out_dir.mkdir(parents=True, exist_ok=True)

def generate_portal():
    im = Image.open(src_dir / "media_1792956554120.jpg")
    im = im.crop((0, 105, im.width, im.height))
    H, W = im.height, im.width
    arr = np.array(im, dtype=np.float32) / 255.0

    lift = 0.22 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    y_ramp = np.linspace(0, 1, H)[:, None, None]
    arr[:, :, 0] = np.clip(arr[:, :, 0] * (1.0 + 0.07 * y_ramp[:, :, 0]) + 0.01 * y_ramp[:, :, 0], 0, 1)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * (1.0 + 0.02 * y_ramp[:, :, 0]), 0, 1)

    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    sky_factor = np.exp(- (np.arange(H)[:, None] / (H * 0.45))**2)
    neutrality = np.clip(1.0 - np.abs(arr[:, :, 0] - arr[:, :, 2]) * 3.5, 0, 1)
    brightness = np.clip((lum - 0.50) / 0.35, 0, 1)
    sky_weight = sky_factor * neutrality * brightness * 0.45

    target_blue = np.array([125.0 / 255.0, 168.0 / 255.0, 218.0 / 255.0])
    arr = (1.0 - sky_weight[:, :, None]) * arr + sky_weight[:, :, None] * target_blue

    sea_prob = np.clip((arr[:, :, 1] - arr[:, :, 0]) * 8.0, 0, 1) * np.clip((arr[:, :, 2] - arr[:, :, 0]) * 8.0, 0, 1)
    vertical_sea = np.exp(- ((np.arange(H)[:, None] - H * 0.45) / (H * 0.10))**2)
    sea_weight = sea_prob * vertical_sea * 0.5
    arr[:, :, 1] = np.clip(arr[:, :, 1] * (1.0 + 0.15 * sea_weight), 0, 1)
    arr[:, :, 2] = np.clip(arr[:, :, 2] * (1.0 + 0.22 * sea_weight), 0, 1)

    im_out = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.25)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.11)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    
    dest = out_dir / "gallery-portal.webp"
    im_out.save(dest, "WEBP", quality=90, method=6)
    print(f"Saved {dest} ({im_out.size})")

def generate_cactus():
    im = Image.open(src_dir / "media_1792956554201.jpg")
    H, W = im.height, im.width
    arr = np.array(im, dtype=np.float32) / 255.0

    lift = 0.20 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.06 + 0.015, 0, 1)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * 1.025 + 0.005, 0, 1)

    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    sky_factor = np.exp(- (np.arange(H)[:, None] / (H * 0.35))**2)
    neutrality = np.clip(1.0 - np.abs(arr[:, :, 0] - arr[:, :, 2]) * 3.5, 0, 1)
    brightness = np.clip((lum - 0.55) / 0.30, 0, 1)
    sky_weight = sky_factor * neutrality * brightness * 0.40

    target_blue = np.array([125.0 / 255.0, 168.0 / 255.0, 218.0 / 255.0])
    arr = (1.0 - sky_weight[:, :, None]) * arr + sky_weight[:, :, None] * target_blue

    cactus_mask = (arr[:, :, 1] > arr[:, :, 0] * 1.05) & (arr[:, :, 1] > arr[:, :, 2] * 1.15)
    arr_c = arr.copy()
    arr_c[:, :, 1] = np.clip(arr_c[:, :, 1] * 1.15, 0, 1)
    arr = np.where(cactus_mask[:, :, None], arr_c, arr)

    im_out = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.25)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.12)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    
    dest = out_dir / "gallery-cactus-pergola.webp"
    im_out.save(dest, "WEBP", quality=90, method=6)
    print(f"Saved {dest} ({im_out.size})")

def generate_huts():
    im = Image.open(src_dir / "media_1792956554216.jpg")
    H, W = im.height, im.width
    arr = np.array(im, dtype=np.float32) / 255.0

    lift = 0.18 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.05 + 0.015, 0, 1)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * 1.02 + 0.005, 0, 1)

    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    sky_factor = np.exp(- (np.arange(H)[:, None] / (H * 0.40))**2)
    neutrality = np.clip(1.0 - np.abs(arr[:, :, 0] - arr[:, :, 2]) * 3.5, 0, 1)
    brightness = np.clip((lum - 0.55) / 0.30, 0, 1)
    sky_weight = sky_factor * neutrality * brightness * 0.40

    target_blue = np.array([125.0 / 255.0, 168.0 / 255.0, 218.0 / 255.0])
    arr = (1.0 - sky_weight[:, :, None]) * arr + sky_weight[:, :, None] * target_blue

    im_out = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.23)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.12)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    
    dest = out_dir / "gallery-historic-huts.webp"
    im_out.save(dest, "WEBP", quality=90, method=6)
    print(f"Saved {dest} ({im_out.size})")

def generate_overlook():
    im = Image.open(src_dir / "media_1792956554140.jpg")
    arr = np.array(im, dtype=np.float32) / 255.0

    lift = 0.12 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    im_out = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.24)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.12)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    
    dest = out_dir / "gallery-stone-overlook.webp"
    im_out.save(dest, "WEBP", quality=90, method=6)
    print(f"Saved {dest} ({im_out.size})")

def generate_foundations():
    im = Image.open(src_dir / "media_1792958549009.jpg")
    H, W = im.height, im.width
    arr = np.array(im, dtype=np.float32) / 255.0

    lift = 0.20 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.06 + 0.015, 0, 1)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * 1.025 + 0.005, 0, 1)

    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    sky_factor = np.exp(- (np.arange(H)[:, None] / (H * 0.40))**2)
    neutrality = np.clip(1.0 - np.abs(arr[:, :, 0] - arr[:, :, 2]) * 3.5, 0, 1)
    brightness = np.clip((lum - 0.55) / 0.30, 0, 1)
    sky_weight = sky_factor * neutrality * brightness * 0.40
    target_blue = np.array([125.0 / 255.0, 168.0 / 255.0, 218.0 / 255.0])
    arr = (1.0 - sky_weight[:, :, None]) * arr + sky_weight[:, :, None] * target_blue

    sea_prob = np.clip((arr[:, :, 1] - arr[:, :, 0]) * 8.0, 0, 1) * np.clip((arr[:, :, 2] - arr[:, :, 0]) * 8.0, 0, 1)
    vertical_sea = np.exp(- ((np.arange(H)[:, None] - H * 0.52) / (H * 0.08))**2)
    sea_weight = sea_prob * vertical_sea * 0.5
    arr[:, :, 1] = np.clip(arr[:, :, 1] * (1.0 + 0.14 * sea_weight), 0, 1)
    arr[:, :, 2] = np.clip(arr[:, :, 2] * (1.0 + 0.20 * sea_weight), 0, 1)

    im_out = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.25)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.12)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    
    dest = out_dir / "gallery-foundations-sea.webp"
    im_out.save(dest, "WEBP", quality=90, method=6)
    print(f"Saved {dest} ({im_out.size})")

def generate_palapa_interior():
    im = Image.open(src_dir / "media_1792958549064.jpg")
    H, W = im.height, im.width
    arr = np.array(im, dtype=np.float32) / 255.0

    lift = 0.28 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.05 + 0.015, 0, 1)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * 1.02 + 0.005, 0, 1)

    im_out = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.22)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.11)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    
    dest = out_dir / "gallery-palapa-interior.webp"
    im_out.save(dest, "WEBP", quality=90, method=6)
    print(f"Saved {dest} ({im_out.size})")

def generate_estate():
    im = Image.open(src_dir / "media_1792958636616.jpg")
    im = im.crop((7, 10, 1019, 753))
    arr = np.array(im, dtype=np.float32) / 255.0

    lift = 0.12 * (1.0 - arr) * (1.0 - arr) * arr * 4.0
    arr = arr + lift

    y_coords = np.arange(arr.shape[0])[:, None, None] / arr.shape[0]
    sand_mask = np.clip((y_coords - 0.6) / 0.3, 0, 1)
    arr[:, :, 0] = np.clip(arr[:, :, 0] * (1.0 + 0.05 * sand_mask[:, :, 0]) + 0.01 * sand_mask[:, :, 0], 0, 1)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * (1.0 + 0.02 * sand_mask[:, :, 0]), 0, 1)

    im_out = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    im_out = ImageEnhance.Color(im_out).enhance(1.20)
    im_out = ImageEnhance.Contrast(im_out).enhance(1.10)
    im_out = im_out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    
    dest = out_dir / "gallery-estate-construction.webp"
    im_out.save(dest, "WEBP", quality=90, method=6)
    print(f"Saved {dest} ({im_out.size})")

if __name__ == "__main__":
    generate_portal()
    generate_cactus()
    generate_huts()
    generate_overlook()
    generate_palapa_interior()
    generate_estate()
    generate_foundations()
    print("All 7 gallery assets built successfully!")
