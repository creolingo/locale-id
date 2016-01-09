# Locale ID

Parse and normalize locale ID

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/locale-id.svg?style=flat-square
[npm-url]: https://www.npmjs.com/locale-id
[travis-image]: https://img.shields.io/travis/CherrySoftware/locale-id/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/CherrySoftware/locale-id
[coveralls-image]: https://img.shields.io/coveralls/CherrySoftware/locale-id/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/CherrySoftware/locale-id?branch=master
[github-url]: https://github.com/CherrySoftware/locale-id

# Installation

Install via npm.

```sh
npm install locale-id
```

# Support us

Star this project on [GitHub][github-url].

# Usage

### parse

```js
import parse from 'locale-id';

const locale = parse('sk-sk');
console.log(result); // => { language: 'sk', country: 'SK' }

const locale = parse('sk_Latin_SK');
console.log(result); // => { language: 'sk', script: 'Latin', country: 'SK' }
```

### normalize

```js
import { normalize } from 'locale-id';

const locale = normalize('sk-sk');
console.log(result); // => sk_SK
```

### getLanguage

```js
import { getLanguage } from 'locale-id';

const lg = getLanguage('sk-sk');
console.log(lg); // => sk
```

### getCountry

```js
import { getCountry } from 'locale-id';

const country = getLanguage('cs-cz');
console.log(country); // => CZ
```

### getScript

```js
import { getScript } from 'locale-id';

const script = getLanguage('sk-latin-sk');
console.log(script); // => Latin
```

# Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

```sh
npm install
```

Then run the tests:

```sh
npm test
```
