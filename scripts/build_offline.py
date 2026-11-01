"""Build a self-contained HTML page from the readable browser sources."""
import base64
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def build():
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    css = (ROOT / 'style.css').read_text(encoding='utf-8')
    html = html.replace('<link rel="stylesheet" href="style.css">', '<style>' + css + '</style>')
    for source in ('vendor/pdf-lib.min.js', 'app.js'):
        encoded = base64.b64encode((ROOT / source).read_bytes()).decode('ascii')
        html = html.replace(f'src="{source}"', f'src="data:text/javascript;base64,{encoded}"')
    licenses = {'Paperjoin': (ROOT / 'LICENSE').read_text(encoding='utf-8')}
    licenses.update({p.name: p.read_text(encoding='utf-8') for p in sorted((ROOT / 'vendor/licenses').glob('*.txt'))})
    notices = json.dumps(licenses, ensure_ascii=False, indent=2).replace('<', r'\u003c')
    html = html.replace('</head>', '<script type="application/json" id="third-party-notices">' + notices + '</script></head>')
    (ROOT / 'Paperjoin.html').write_text(html, encoding='utf-8')
    print('Built Paperjoin.html')

if __name__ == '__main__':
    build()
