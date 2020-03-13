const updateDependenciesMatching = /^gatest-app[0-9]*$/gm;
// standard-version-updater.js
const stringifyPackage = require('stringify-package');
const detectIndent = require('detect-indent');
const detectNewline = require('detect-newline');

module.exports.readVersion = function (contents) {
    return JSON.parse(contents).version;
}

module.exports.writeVersion = function (contents, version) {
    const packageJson = JSON.parse(contents);
    let indent = detectIndent(contents).indent;
    let newline = detectNewline(contents);
    packageJson.version = version;
    for (let depSec of ['dependencies', 'devDependencies', 'peerDependencies', 'bundledDependencies', 'optionalDependencies']) {
        if (packageJson[depSec]) {
            for (let dependency in packageJson[depSec]) {
                if (updateDependenciesMatching.test(dependency)) {
                    packageJson[depSec][dependency] = version;
                }
            }
        }
    }
    return stringifyPackage(packageJson, indent, newline);
}
