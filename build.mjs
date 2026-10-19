import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const result=spawnSync('python', ['generate.py'], {cwd:root, encoding:'utf8'});
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
if (result.status !== 0) process.exit(result.status ?? 1);
const data=JSON.parse(fs.readFileSync(path.join(root,'data/vehicles.json'),'utf8'));
const pages=fs.readdirSync(path.join(root,'docs'),{recursive:true}).filter(x=>x.endsWith('index.html'));
const ids=new Set(data.map(v=>v.id));
if (ids.size !== data.length) throw new Error('Duplicate vehicle ids in data/vehicles.json');
if (data.some(v=>/g63/i.test(v.id+' '+(v.model||'')))) throw new Error('G63 must stay removed from the records');
for (const v of data.filter(v=>!['hidden','pending_confirmation'].includes(v.status))) for (const im of v.images) {
  const f=path.join(root,'docs/assets/cars',v.id,im.file);
  if (!fs.existsSync(f)) throw new Error(`Missing deployed photo ${v.id}/${im.file}`);
}
const qa=spawnSync('python', ['scripts/qa.py'], {cwd:root, encoding:'utf8'});
if (qa.stdout) process.stdout.write(qa.stdout);
if (qa.stderr) process.stderr.write(qa.stderr);
if (qa.status !== 0) process.exit(qa.status ?? 1);
console.log(`Build checks passed: ${pages.length} index pages, ${data.length} vehicle records.`);

// Keep a root-published copy in sync as a deployment fallback. This prevents
// GitHub Pages from serving an older root index when Pages is configured to /(root).
// Drop stale vehicle pages and photos from the root mirror first so removed cars cannot linger.
for (const p of ['en/cars','ar/cars','assets/cars']) fs.rmSync(path.join(root,p),{recursive:true,force:true});
for (const name of ['index.html', '404.html', 'ar', 'en', 'assets', 'manifest.webmanifest', 'robots.txt', 'sitemap.xml']) {
  const from = path.join(root, 'docs', name);
  const to = path.join(root, name);
  if (!fs.existsSync(from)) continue;
  fs.cpSync(from, to, { recursive: true, force: true });
}
console.log('Deployment fallback synchronized to repository root.');
