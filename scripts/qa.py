import re, json
from pathlib import Path
R=Path(__file__).resolve().parents[1]; D=R/'docs'; errors=[]
def lum(h):
 vals=[int(h[i:i+2],16)/255 for i in (1,3,5)]
 vals=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in vals]
 return sum(a*b for a,b in zip(vals,[.2126,.7152,.0722]))
def contrast(a,b):
 x,y=sorted((lum(a),lum(b)),reverse=True);return (x+.05)/(y+.05)
tokens={'body text on page':('#f4f0e8','#0b0b0a',4.5),'muted text on page':('#c8c2b7','#0b0b0a',4.5),'gold text on page':('#e7c77e','#0b0b0a',4.5),'button text on gold':('#17130b','#e7c77e',4.5),'muted text on panel':('#c8c2b7','#171613',4.5),'body text on panel':('#f4f0e8','#171613',4.5),'gold text on panel':('#e7c77e','#171613',4.5)}
for name,(fg,bg,threshold) in tokens.items():
 ratio=contrast(fg,bg); print(f'contrast {name}: {ratio:.2f}:1')
 if ratio<threshold: errors.append(f'Contrast failure: {name} {ratio:.2f}:1')
external=[]; pages=list(D.rglob('*.html'))
for p in pages:
 s=p.read_text(encoding='utf-8')
 for src in re.findall(r'<script[^>]+src=["\']([^"\']+)|<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)|<img[^>]+src=["\']([^"\']+)',s,re.I):
  src=next((x for x in src if x), '')
  if src.startswith(('http://','https://','//')): external.append((str(p.relative_to(D)),src))
 # verify vehicle data price on detail page
for v in json.load(open(R/'data/vehicles.json',encoding='utf-8')):
 for l in ('ar','en'):
  p=D/l/'cars'/v['id']/'index.html'; s=p.read_text(encoding='utf-8')
  if f"{v['price']:,}" not in s: errors.append(f'Price missing from {l}/{v["id"]}')
  for im in v['images']:
   if not (D/'assets/cars'/v['id']/im['file']).exists(): errors.append(f'Missing image {v["id"]}/{im["file"]}')
if external: errors.append('Third-party-origin requests found: '+repr(external[:5]))
print(f'HTML page count: {len(pages)}')
print(f'External script/style/image references: {len(external)}')
if errors:
 for e in errors: print('FAIL:',e)
 raise SystemExit(1)
print('QA checks passed. Manual browser, screen-reader, Lighthouse and deployed-network QA remain launch tasks.')
