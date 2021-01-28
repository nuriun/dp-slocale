function getAllValid(result) {
    return result
        .map((folder) => folder.result.files.map((file) => file.keys).flat())
        .flat()
        .reduce((collect, keyValue) => {
            const [key, value] = keyValue.split('~~~');
            if (!collect[key]) {
                collect[key] = value;
            }
            return collect;
        }, {});
}

module.exports = getAllValid;