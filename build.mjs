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
if (data.length !== 5) throw new Error(`Expected 5 vehicle records, found ${data.length}`);
for (const v of data) for (const im of v.images) {
  const f=path.join(root,'docs/assets/cars',v.id,im.file);
  if (!fs.existsSync(f)) throw new Error(`Missing deployed photo ${v.id}/${im.file}`);
}
const qa=spawnSync('python', ['scripts/qa.py'], {cwd:root, encoding:'utf8'});
if (qa.stdout) process.stdout.write(qa.stdout);
if (qa.stderr) process.stderr.write(qa.stderr);
if (qa.status !== 0) process.exit(qa.status ?? 1);
console.log(`Build checks passed: ${pages.length} index pages, ${data.length} vehicle records.`);
