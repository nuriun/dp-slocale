function getAllTemplate(_path, _folders, allLocalizations) {
    let content = `
##################### USED ALL LOCALIZATION KEYS #####################

Date: ${new Date()}
parent path: ${_path}
folders: ${_folders.join(', ')}\n\n`;

    content += Object.keys(allLocalizations)
        .map((key, index) => index + 1 + '.\n' + 'key: ' + key + '\ndefault: ' + allLocalizations[key])
        .join('\n\n');
    return content;
}

module.exports = getAllTemplate;