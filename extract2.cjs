const fs = require('fs');
const html = fs.readFileSync('e:/codekeys/codekeys.html', 'utf8');
const statsMatch = html.match(/<div id="page-stats"[\s\S]*?(?=<!-- =)/);
fs.writeFileSync('e:/codekeys/scratch2.txt', (statsMatch ? statsMatch[0] : ''));
