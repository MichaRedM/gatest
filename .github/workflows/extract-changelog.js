const fs = require('fs');
const path = process.env['CHANGELOG_PATH'] || './CHANGELOG.md';
let version = process.env['VERSION'];

if(version.startsWith('v')) {
    version = version.substring(1);
}

console.log('generating changelog for version "'+ version + '"');

const changelogLines = fs.readFileSync(path).toString().split('\n');
let result = [];

let logRegionStarted = false;

for (let i = 0; i < changelogLines.length; i++) {
    if (changelogLines[i].startsWith('## ' + version) || changelogLines[i].startsWith('## [' + version)) {
        logRegionStarted = true;
    } else if (changelogLines[i].startsWith('### ' + version) || changelogLines[i].startsWith('### [' + version)) {
        logRegionStarted = true;
    } else if (logRegionStarted && changelogLines[i].startsWith('## ')) {
        break;
    } else if (
        logRegionStarted &&
        changelogLines[i].startsWith('### ') &&
        changelogLines[i].indexOf('Bug Fixes') === -1 &&
        changelogLines[i].indexOf('Features') === -1 &&
        changelogLines[i].indexOf('BREAKING CHANGES') === -1
    ) {
        break;
    }
    if (logRegionStarted) {
        result.push(changelogLines[i]);
    }
}
console.log(result.join('\n'));
fs.writeFileSync(path, result.join('\n'));