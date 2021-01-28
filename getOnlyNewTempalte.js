function getOnlyNewTempalte(_path, _folders, localizationsFromDb, localizationsFromFiles) {
    let content = `

    Generated with dp-slocale@1.0.0

    ##################### NEW LOCALIZATONS KEY #####################
    
    Export Date: ${new Date()}
    Parent path: ${_path}
    Folders: ${_folders.join(', ')}\n\n`;

    content += Object.keys(localizationsFromFiles)
        .filter((k) => !localizationsFromDb[k])
        .map((key, index) => index + 1 + '.\n' + 'key: ' + key + '\ndefault: ' + localizationsFromFiles[key])
        .join('\n\n');

    return content;
}

module.exports = getOnlyNewTempalte;