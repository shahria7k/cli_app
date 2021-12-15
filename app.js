#! /usr/bin/env node
import { readFile, writeFile } from 'fs/promises';
let current = process.cwd();
const str = "file://" + "/" + current.replace(/\\/g, '/') + "/app.js";
const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>{title}</h1>
  <p>{body}</p>
</body>
</html>`;
await writeFile(new URL('template.html', str), template);
let temp = await readFile(new URL('./template.html', import.meta.url), 'utf-8');
const data = {
  title: 'Learn node.js',
  body: "This is the final HTML"
};
for (const [key, value] of Object.entries(data)) {
  temp = temp.replace(`{${key}}`, value);
}
await writeFile(new URL('index.html', str), temp);
console.log("done");