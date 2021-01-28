#!/usr/bin/env node  
const fetch = require('node-fetch');
const path = require('path');

/**
 * -d directory
 * -f folders
 * -n only news
 * -u only unused
 * -wf with flawed list
 */

const find = require('./find');
const findArgValue = require('./findArgValue');
const getAllTemplate = require('./getAllTemplate');
const getAllValid = require('./getAllValid');
const getOnlyNewTempalte = require('./getOnlyNewTempalte');
const urlValidate = require('./urlValidate');
const wrieTemplateAsTxtFile = require('./writeTemplateAsTxtFile');

const directoryPath = path.join(process.cwd(), findArgValue('-d') || '', '.');

const folders = findArgValue('-f') ? findArgValue('-f').split(',').map((f) => f.trim()) : ['/'];


async function main(_path, _folders) {
    let result = [];

    const promises = _folders.map((folder) => {
        return new Promise((resolve, reject) => {
            find(path.join(_path, folder, '/'))
                .then((data) => {
                    if(data) {
                        console.log('search... ' + folder);
                        result.push({
                            folder,
                            result: data,
                        });
                    }
                    resolve(data);
                })
                .catch(reject);
        });
    });

    Promise.all(promises).finally(async () => {


        if(result.length === 0) {
            return;
        }

        const localizationsFromFiles = getAllValid(result);

        let template = '';
        let name = 'localizationsKeysResult.txt'

        const apiUrl = findArgValue('-n'); 

        if(apiUrl) {
            
            if(!urlValidate(apiUrl) || !apiUrl.includes('/api/localization')) {
                return console.error('Please use dominos api localization endpoint.');
            }


            const localizationsFromDb = await (await fetch(apiUrl)).json();

            template = getOnlyNewTempalte(_path, _folders, localizationsFromDb, localizationsFromFiles);
            name = 'newLocalizationsKeysResult.txt';

        } else {
            template = getAllTemplate(_path, _folders, localizationsFromFiles);
        }

        

        wrieTemplateAsTxtFile(name, template);
        console.log('done');
    });
}

main(directoryPath, folders);

