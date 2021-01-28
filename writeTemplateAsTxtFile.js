const fs = require('fs');

function wrieTemplateAsTxtFile(name, content) {
    fs.writeFile(process.cwd() + '/' + name, content, (err) => {
        console.log('saved here: ' + process.cwd() + '/' + name);
        if (err) {
            return console.error(err);
        }
    });
}

module.exports = wrieTemplateAsTxtFile;
