from PIL import Image,ImageEnhance,ImageOps
from pathlib import Path
base=Path('/mnt/data'); out=base/'el-porvenir-web/public/assets'; out.mkdir(parents=True,exist_ok=True)

def webp(name,path,crop=None,size=None,quality=87,contrast=1.0,color=1.0,brightness=1.0):
 im=Image.open(base/path).convert('RGB')
 if crop: im=im.crop(crop)
 if size: im.thumbnail(size,Image.Resampling.LANCZOS)
 if brightness!=1:im=ImageEnhance.Brightness(im).enhance(brightness)
 if contrast!=1:im=ImageEnhance.Contrast(im).enhance(contrast)
 if color!=1:im=ImageEnhance.Color(im).enhance(color)
 im.save(out/name, 'WEBP',quality=quality,method=6)
 print(name, im.size)

def rgba(name,path,resize_to=None):
 im=Image.open(base/path).convert('RGBA')
 bb=im.getbbox(); im=im.crop(bb)
 if resize_to:im.thumbnail(resize_to,Image.Resampling.LANCZOS)
 im.save(out/name,optimize=True)
 print(name, im.size)
rgba('logo-dark.png','logo_costero_el_porvenir.png',(1000,800))
rgba('logo-light.png','logo_costero_de_lujo_el_porvenir.png',(1000,800))
rgba('emblem.png','emblema_dorado_de_dunas_y_olas.png',(680,500))
webp('hero-concept.webp','atardecer_sobre_costa_desértica.png',size=(1920,1080),quality=89)
webp('architecture-concept.webp','casa_moderna_de_lujo_frente_al_mar.png',size=(1300,980),quality=88)
# Historical photographic sources, retaining the structures / landscapes as photographed.
webp('original-palapa.webp','WhatsApp Image 2026-10-18 at 9.58.27 AM (2).jpeg',crop=(55,46,1530,1226),size=(1300,1000),contrast=1.05,color=1.04)
webp('original-architecture.webp','WhatsApp Image 2026-10-18 at 9.58.27 AM (6).jpeg',crop=(55,39,1535,1258),size=(1200,1000),contrast=1.05,color=1.07)
webp('original-seaview.webp','WhatsApp Image 2026-10-18 at 9.58.27 AM (4).jpeg',crop=(5,178,1022,865),size=(1300,900),contrast=1.05,color=1.03)
webp('original-front.webp','WhatsApp Image 2026-10-18 at 9.58.27 AM (1).jpeg',crop=(55,46,1520,620),size=(1200,800),contrast=1.05,color=1.05)
webp('original-arch.webp','WhatsApp Image 2026-10-18 at 9.58.27 AM (3).jpeg',crop=(32,25,1565,682),size=(1200,800),contrast=1.02,color=1.06)
webp('historical-concrete.webp','WhatsApp Image 2026-10-18 at 9.58.28 AM.jpeg',size=(1250,950),contrast=1.04,color=1.06)
webp('historic-pergola.webp','WhatsApp Image 2026-10-18 at 9.58.28 AM (1).jpeg',size=(1200,950),contrast=1.03,color=1.06)
# Conceptual visual panels from previous approved presentation (not current property condition).
webp('vision-resort.webp','el_porvenir_visión_costera_extraordinaria.png',crop=(0,662,555,808),size=(900,600))
webp('vision-residential.webp','el_porvenir_visión_costera_extraordinaria.png',crop=(565,662,1074,807),size=(900,600))
webp('vision-eco.webp','el_porvenir_visión_costera_extraordinaria.png',crop=(1100,663,1668,809),size=(900,600))
# A design-reference map, not a legal/geodetic cadastral map; UI elements overlaid in HTML and SVG.
webp('territory-reference.webp','mapa_de_inversión_costera_el_porvenir.png',crop=(48,22,1599,866),size=(1500,900),quality=88)
