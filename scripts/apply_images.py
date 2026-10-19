"""Apply a CONFIRMED vehicle-to-photo mapping. Nothing is assigned unless it is listed in data/image-assignments.json.
Format: {"vehicle-id": ["P01","P02", ...]}  (refs from IMAGE_MANIFEST.md; order = gallery order, first = cover photo)
Usage: python3 -I scripts/apply_images.py && npm run build
Originals are never modified. Copies are resized to at most 1600 px on the long side, never upscaled."""
import json,sys
from pathlib import Path
from PIL import Image, ImageOps
R=Path(__file__).resolve().parents[1]
man={i['ref']:i for i in json.load(open(R/'data/image-manifest.json'))['images']}
amap=json.load(open(R/'data/image-assignments.json')); vs=json.load(open(R/'data/vehicles.json',encoding='utf-8')); byid={v['id']:v for v in vs}
used={}
for vid,refs in amap.items():
    if vid not in byid: sys.exit(f'Unknown vehicle id {vid}')
    if byid[vid]['status'] in ('hidden','pending_confirmation') : print('note:',vid,'is unpublished; photos go to held-assets')
    for r in refs:
        if r not in man: sys.exit(f'Unknown image ref {r}')
        if r in used: sys.exit(f'{r} is assigned to both {used[r]} and {vid}')
        used[r]=vid
for vid,refs in amap.items():
    v=byid[vid]; pub=v['status'] not in ('hidden','pending_confirmation')
    out=(R/'docs/assets/cars'/vid) if pub else (R/'data/held-assets'/vid); out.mkdir(parents=True,exist_ok=True)
    for f in out.glob('*.jpg'): f.unlink()
    nm=' '.join(str(x) for x in [v.get('year'),v['brand'],v.get('model') or (v['trim']['en'] if v.get('trim') else None)] if x)
    imgs=[]
    for n,r in enumerate(refs,1):
        im=ImageOps.exif_transpose(Image.open(R/'source-assets/cars-incoming'/man[r]['file'])).convert('RGB'); im.thumbnail((1600,1600),Image.LANCZOS)
        fn=f'{n:02d}-photo.jpg'; im.save(out/fn,quality=84,optimize=True,progressive=True)
        imgs.append({'file':fn,'view':'photo','source_ref':r,'alt':{'en':f'{nm}, photo {n}','ar':f'{nm}، صورة {n}'},'rights_confirmed':False})
    v['images']=imgs
json.dump(vs,open(R/'data/vehicles.json','w',encoding='utf-8'),ensure_ascii=False,indent=2)
print('applied',{k:len(x) for k,x in amap.items()})
