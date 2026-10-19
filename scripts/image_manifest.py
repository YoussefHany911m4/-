"""Inventory the incoming photo folder. Read-only: never renames, moves or assigns images.
Usage: python3 -I scripts/image_manifest.py   (writes data/image-manifest.json, IMAGE_MANIFEST.md, data/contact-sheet-*.jpg)"""
import json,hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ExifTags
R=Path(__file__).resolve().parents[1]; SRC=R/'source-assets/cars-incoming'
exts={'.jpg','.jpeg','.png','.webp'}
files=sorted(p for p in SRC.iterdir() if p.suffix.lower() in exts)
def ahash(im):
    g=im.convert('L').resize((8,8)); px=list(g.get_flattened_data() if hasattr(g,'get_flattened_data') else g.getdata()); m=sum(px)/64
    return int(''.join('1' if x>m else '0' for x in px),2)
amap=json.load(open(R/'data/image-assignments.json')) if (R/'data/image-assignments.json').exists() else {}
owner={r:vid for vid,rs in amap.items() for r in rs}
rows=[]
for n,p in enumerate(files,1):
    b=p.read_bytes(); im=Image.open(p)
    try: im=Image.open(p); w,h=im.size
    except Exception as e: rows.append({'file':p.name,'error':str(e)}); continue
    rows.append({'ref':f'P{n:02d}','file':p.name,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'width':w,'height':h,
      'orientation':'landscape' if w>h else 'portrait' if h>w else 'square','low_resolution':max(w,h)<1000,
      'ahash':ahash(im),'exact_duplicate_of':None,'possible_visual_duplicates':[],'assigned_to':owner.get(f'P{n:02d}')})
seen={}
for r in rows:
    if r['sha256'] in seen: r['exact_duplicate_of']=seen[r['sha256']]
    else: seen[r['sha256']]=r['ref']
for i,a in enumerate(rows):
    for b in rows[i+1:]:
        if a['sha256']!=b['sha256'] and bin(a['ahash']^b['ahash']).count('1')<=4:
            a['possible_visual_duplicates'].append(b['ref']); b['possible_visual_duplicates'].append(a['ref'])
for r in rows: r['ahash']=f"{r['ahash']:016x}"
out={'source_folder':'source-assets/cars-incoming','count':len(rows),'expected_total_per_owner':73,'missing_vs_expected':73-len(rows),
     'note':'Assignment to vehicles is intentionally blank until the owner confirms grouping and order.','images':rows}
(R/'data/image-manifest.json').write_text(json.dumps(out,indent=1),encoding='utf-8')
dups=[r for r in rows if r.get('exact_duplicate_of')]; vis=[r for r in rows if r.get('possible_visual_duplicates')]
md=['# Incoming image manifest','',f'Folder: `source-assets/cars-incoming` | Files found: **{len(rows)}** | Owner estimate of full set: 73 | Still to arrive: **{73-len(rows)}** (to be confirmed)','',
 'Originals are untouched. Rows are in filename order; the Assigned column comes from data/image-assignments.json.','',
 f'Exact duplicates (identical bytes): **{len(dups)}**'+(': '+', '.join(f"{r['ref']} = {r['exact_duplicate_of']}" for r in dups) if dups else ''),
 f'Possible visual duplicates (near-identical picture, different file): **{len(vis)}**'+(': '+', '.join(sorted({" ~ ".join(sorted([r["ref"]]+r["possible_visual_duplicates"])) for r in vis})) if vis else ''),
 f'Low resolution (longest side under 1000 px): **{sum(r["low_resolution"] for r in rows)}**','',
 '| Ref | File | Size (px) | KB | Orientation | Notes | Assigned to |','|---|---|---|---|---|---|---|']
for r in rows:
    notes=[]
    if r['exact_duplicate_of']: notes.append('exact duplicate of '+r['exact_duplicate_of'])
    if r['possible_visual_duplicates']: notes.append('looks like '+', '.join(r['possible_visual_duplicates']))
    if r['low_resolution']: notes.append('low resolution')
    md.append(f"| {r['ref']} | {r['file']} | {r['width']}x{r['height']} | {r['bytes']//1024} | {r['orientation']} | {'; '.join(notes)} | {r['assigned_to'] or 'unassigned'} |")
(R/'IMAGE_MANIFEST.md').write_text('\n'.join(md)+'\n',encoding='utf-8')
# contact sheets (labelled by ref) so the owner can say "P01-P06 are the Audi"
per=20; cols=5; tw,th=300,225
for s in range(0,len(files),per):
    chunk=list(zip(rows[s:s+per],files[s:s+per])); rr=(len(chunk)+cols-1)//cols
    sheet=Image.new('RGB',(cols*tw,rr*(th+22)),'#111'); d=ImageDraw.Draw(sheet)
    for k,(r,p) in enumerate(chunk):
        im=Image.open(p).convert('RGB'); im.thumbnail((tw-8,th-8)); x=(k%cols)*tw; y=(k//cols)*(th+22)
        sheet.paste(im,(x+4,y+22)); d.text((x+6,y+4),r['ref'],fill='#e7c77e')
    sheet.save(R/f'data/contact-sheet-{s//per+1}.jpg',quality=80)
print(len(rows),'images;',len(dups),'exact dups;',len(vis),'with visual lookalikes')
