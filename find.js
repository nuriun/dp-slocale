const readdirp = require('readdirp');
const fs = require('fs');

const collection = [];

const directoryFilter = ['!node_modules', '!.git', '!.next', '!.vscode', '!build', '!__tests__'];

const readdirpOptions = {
    fileFilter: ['*.js', '*.jsx'],
    alwaysStat: true,
    directoryFilter,
};

const newLine = /\n/g;

// localize( ... )
const localizeValidate = /(localize\((\s|\S)*?\))/g;

// exam: localize('
// exam: localize("
// exam: localize(`
// exam: localize(   '
// exam: localize( //  '
const clearLocalizeKeyword = /((\s?)+\/\/(\s?)+)?localize\(((\s?)+\/\/(\s?)+)?(\s?)+('|"|`)/;

// exam: ', '
const splitCharPositionFinder = /('|"|`),(\s?)+('|"|`)/;

// examp: ')
// examp: ");
// examp: `),
const clearEndingParts = /('|"|`),?(\s?)+\)(;|,)?/;

function formatLocalizeText(text) {
    return text
        .replace(clearLocalizeKeyword, '')
        .replace(splitCharPositionFinder, '~~~')
        .replace(clearEndingParts, '')
        .trim();
}

function foundFile(entry, directoryPath) {
    const path = directoryPath + entry.path;

    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) {
            return console.error(err);
        }

        const file = data.replace(newLine, '');
        const results = file.match(localizeValidate);

        if (results) {
            collection.push({
                path: entry.path,
                keys: Array.from(results),
            });
        }
    });
}

function findingEnd(_path) {
    const flawedlist = [];

    if(collection.length === 0) {
        console.error('The file using the "localize()" method was not found in this path: ' + _path);
        return null;
    }

    const files = collection.map((file) => {
        const keys = file.keys.map(formatLocalizeText);
        const flawed = keys.filter((key) => key.includes('localize(') || key.includes('//'));
        const result = keys.filter((key) => !key.includes('localize(') && !key.includes('//'));

        if (flawed.length > 0) {
            flawedlist.push({
                path: file.path,
                keys: flawed,
            });
        }

        file.keys = result;
        return file;
    });

    return {
        flawedlist,
        files,
    };
}

/**
 * 
 * @param {string} directoryPath 
 */
function find(directoryPath) {
    return new Promise((resolve, reject) => {
        readdirp(directoryPath, readdirpOptions)
            .on('data', entry => foundFile(entry, directoryPath))
            .on('warn', (warn) => console.warn(warn))
            .on('error', reject)
            .on('end', () => {
                const result = findingEnd(directoryPath);
                resolve(result);
            });
    });
}

module.exports = find;
