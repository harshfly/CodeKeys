const fs = require('fs');
const html = fs.readFileSync('e:/codekeys/codekeys.html', 'utf8');
const lines = html.split('\n');
const pages = lines.filter(l => l.includes('id="page-'));
console.log(pages);
