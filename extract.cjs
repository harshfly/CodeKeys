const fs = require('fs');
const html = fs.readFileSync('e:/codekeys/codekeys.html', 'utf8');

const challengesMatch = html.match(/<div id="page-challenges"[\s\S]*?(?=<!-- =)/);
const tipsMatch = html.match(/<div id="page-tips"[\s\S]*?(?=<!-- =)/);
const userMatch = html.match(/<div id="page-user"[\s\S]*?(?=<!-- =)/);

fs.writeFileSync('e:/codekeys/scratch.txt', 
  (challengesMatch ? '--- CHALLENGES ---\n' + challengesMatch[0].slice(0, 3000) + '\n\n' : '') +
  (tipsMatch ? '--- TIPS ---\n' + tipsMatch[0].slice(0, 3000) + '\n\n' : '') +
  (userMatch ? '--- USER ---\n' + userMatch[0].slice(0, 3000) + '\n\n' : '')
);
console.log('done');
