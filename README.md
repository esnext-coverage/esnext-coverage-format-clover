# esnext-coverage-format-clover

[![NPM version](http://img.shields.io/npm/v/esnext-coverage-format-clover.svg)](https://www.npmjs.org/package/esnext-coverage-format-clover)

Clover XML formatter for [esnext-coverage].

Similar to other coverage formatters, esnext-coverage-format-clover accepts a coverage results object and produces a report as an XML string.

## Installation

```bash
npm install esnext-coverage-format-clover --save-dev
```

## Usage

### Usage with test frameworks

Add esnext-coverage-format-clover to the list of reporters in esnext-coverage configuration object or to your [karma configuration file](https://github.com/esnext-coverage/karma-esnext-coverage-reporter#usage).

```js
reporters: [
  {
    formatter: 'clover', // require esnext-coverage-format-clover
    outFile: 'reports/coverage.xml' // write output to a file
  }
]
```

### Usage with esnext-coverage cli

```bash
esnext-coverage format coverage.json -f clover -o coverage.xml
```

### Usage in Node

```js
const fs = require('fs');
const formatter = require('esnext-coverage-format-clover');

fs.readFile('coverage.json', 'utf8', (err, data) => {
  const coverage = JSON.parse(data);
  const report = formatter(coverage);
  fs.writeFile('coverage.xml', report);
});
```

## License

[MIT License](http://opensource.org/licenses/MIT)


[esnext-coverage]: https://github.com/esnext-coverage/esnext-coverage
