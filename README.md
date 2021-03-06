# dp-slocale cli tool

[![npm](https://img.shields.io/npm/v/dp-slocale.svg?maxAge=2592000)](https://www.npmjs.com/package/dp-slocale)

##### Desription
This CLI tool has been developed to find and process project-specific localization methods in dpeurasia e-commerce web applications. It is completely useless for another project unless a similar method is used.

##### Install
```bash
npm i -g dp-slocale
```

##### Usage
```bash
dp-slocale -d ./project
```

##### Arguments
- `-d` Search directory. If it is empty, it works in the command path.
- `-f` Allows searching only in specified folders. Takes a string value divided by a comma. 
```bash
dp-slocale -f '/src, /helpers'
```
- `-n` Lists localizations newly added to the project and not included in the API. It takes the API's localization endpoint as an argument for comparison.
```bash
dp-slocale -d ./project -n https://api.site/localization\?locale\=EN
```
- `-wf` It also adds the erroneous results along with the file paths to the output.
