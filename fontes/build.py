#!/usr/bin/env python3
"""Build the self-contained publishing file using only Python's standard library."""
from base64 import b64encode
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'fontes'

def uri(relative, mime):
    return f'data:{mime};base64,' + b64encode((ROOT / relative).read_bytes()).decode('ascii')

def main():
    html = (SOURCE / 'index.template.html').read_text()
    html = html.replace('__STYLES__', (SOURCE / 'styles.css').read_text())
    html = html.replace('__SCRIPT__', (SOURCE / 'site.js').read_text())
    values = {
        '__FAVICON_16__': uri('assets/brand/favicon-16.png', 'image/png'),
        '__FAVICON_32__': uri('assets/brand/favicon-32.png', 'image/png'),
        '__LOGO_DATA__': uri('assets/brand/logo-aprovada.webp', 'image/webp'),
        '__HERO_DATA__': uri('assets/images/assinatura-contrato-imovel.webp', 'image/webp'),
        '__PORTRAIT_DATA__': uri('assets/images/allayanna-mendes.webp', 'image/webp'),
        '__FONT_REGULAR__': uri('assets/fonts/newsreader.woff2', 'font/woff2'),
        '__FONT_ITALIC__': uri('assets/fonts/newsreader-italic.woff2', 'font/woff2'),
        '__FONT_SANS__': uri('assets/fonts/manrope.woff2', 'font/woff2'),
    }
    for placeholder, value in values.items():
        assert placeholder in html, f'Missing required placeholder: {placeholder}'
        html = html.replace(placeholder, value)
    assert not re.search(r'__[A-Z_]+__', html), 'Unresolved template placeholder'
    (ROOT / 'index.html').write_text(html)
    dist = ROOT / 'dist'
    dist.mkdir(exist_ok=True)
    (dist / 'index.html').write_text(html)
    # Test the actual publishing bytes in the same subdirectory as GitHub Pages.
    subdir = dist / 'allayannamendes'
    subdir.mkdir(exist_ok=True)
    (subdir / 'index.html').write_text(html)
    for name in ('favicon.ico', 'apple-touch-icon.png', 'allayanna-mendes-compartilhamento.jpg',
                 '404.html', 'robots.txt', 'sitemap.xml', '.nojekyll'):
        for destination in (dist, subdir):
            shutil.copyfile(ROOT / name, destination / name)
    preview = ROOT.parent / 'Allayanna_Mendes_Previa.html'
    shutil.copyfile(ROOT / 'index.html', preview)
    print(f'Built self-contained index.html: {(ROOT / "index.html").stat().st_size:,} bytes')
    print('Publishing file, subdirectory test and offline preview have identical bytes.')

if __name__ == '__main__':
    main()
