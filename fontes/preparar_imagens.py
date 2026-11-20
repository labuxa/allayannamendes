"""Gera os arquivos de exibição a partir das imagens PNG originais."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "assets" / "brand"
IMAGES = ROOT / "assets" / "images"
LANCZOS = Image.Resampling.LANCZOS


def save_icons(logo):
    # O retângulo seleciona somente o AM da arte original.
    monogram = logo.crop((448, 198, 1088, 606))
    tile = Image.new("RGB", (640, 640), (253, 246, 240))
    tile.paste(monogram, (0, (tile.height - monogram.height) // 2))

    mobile = ImageOps.expand(tile, border=56, fill=(253, 246, 240))
    mobile.resize((180, 180), LANCZOS).save(ROOT / "apple-touch-icon.png", optimize=True)

    mask = Image.new("L", tile.size)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, 639, 639), radius=78, fill=255)
    tile.putalpha(mask)
    tab_sizes = (16, 24, 32, 48, 64, 96)
    layers = []
    for size in tab_sizes:
        layer = tile.resize((size, size), LANCZOS)
        if size <= 32:
            alpha = layer.getchannel("A")
            layer = layer.convert("RGB").filter(ImageFilter.UnsharpMask(radius=0.6, percent=135, threshold=2))
            layer.putalpha(alpha)
        if size in (16, 32):
            layer.save(BRAND / f"favicon-{size}.png", optimize=True)
        layers.append(layer)
    layers[-1].save(ROOT / "favicon.ico", sizes=[im.size for im in layers], append_images=layers[:-1])


def save_share_image(logo, backdrop):
    card = Image.new("RGB", (1200, 630), (250, 247, 242))
    logo_column = 462
    scene = ImageOps.fit(backdrop, (card.width - logo_column, card.height),
                         method=LANCZOS, centering=(0.5, 1.0))
    card.paste(scene, (logo_column, 0))
    plaque = logo.crop((95, 128, 1441, 907)).resize((420, 243), LANCZOS)
    ImageDraw.Draw(plaque).rectangle((6, 6, 413, 236), outline=(165, 129, 68), width=1)
    card.paste(plaque, ((logo_column - plaque.width) // 2, (card.height - plaque.height) // 2))
    card.save(ROOT / "allayanna-mendes-compartilhamento.jpg", quality=88, optimize=True, progressive=True)


def main():
    with Image.open(BRAND / "logo-aprovada.png") as logo:
        logo.resize((960, 640), LANCZOS).save(BRAND / "logo-aprovada.webp", quality=97, method=6)
        save_icons(logo)
        with Image.open(IMAGES / "assinatura-contrato-imovel.png") as backdrop:
            backdrop.save(IMAGES / "assinatura-contrato-imovel.webp", quality=89, method=6)
            save_share_image(logo, backdrop)
    with Image.open(IMAGES / "allayanna-mendes.png") as portrait:
        portrait.save(IMAGES / "allayanna-mendes.webp", quality=91, method=6)


if __name__ == "__main__":
    main()
