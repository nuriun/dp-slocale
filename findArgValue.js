function findArgValue(arg) {
    const argIndex = process.argv.findIndex(a => a === arg);

    if(argIndex === -1) {
        return null;
    }

    const value = process.argv[argIndex + 1];

    return value;
}

module.exports = findArgValue;