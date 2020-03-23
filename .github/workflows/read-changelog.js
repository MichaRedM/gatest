const fs = require('fs');
const path = process.env['CHANGELOG_PATH'] || './CHANGELOG.md';
const version = process.env['VERSION'];

const changelogLines = fs.readFileSync(path).toString().split('\n');
console.log(changelogLines.join('\n'));
let result = [];

let logRegionStarted = false;

for (let i = 0; i < changelogLines.length; i++) {
    if (changelogLines[i].startsWith('## ' + version) || changelogLines[i].startsWith('## [' + version)) {
        logRegionStarted = 'Major';
    } else if (changelogLines[i].startsWith('### ' + version) || changelogLines[i].startsWith('### [' + version)) {
        logRegionStarted = 'Minor';
    } else if (changelogLines[i].startsWith('## ')) {
        logRegionStarted = false;
        break;
    } else if (
        changelogLines[i].startsWith('### ') &&
        changelogLines[i].indexOf('Bug Fixes') === -1 &&
        changelogLines[i].indexOf('Features') === -1 &&
        changelogLines[i].indexOf('BREAKING CHANGES') === -1
    ) {
        logRegionStarted = false;
        break;
    }
    if (logRegionStarted) {
        result.push(changelogLines[i]);
    }
}
console.log('# Changelog for version ' + version + '  \n');
console.log(result.join('\n'));
