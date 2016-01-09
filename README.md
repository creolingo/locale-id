# Locale ID

Parse and normalize locale ID. [ICU Locale ID](http://userguide.icu-project.org/locale)

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

const value = parse('sk_Latin_SK');
console.log(value); // => { language: 'sk', script: 'Latin', country: 'SK' }
```

### normalize

```js
import { normalize } from 'locale-id';

const value = normalize('sk-sk');
console.log(value); // => sk_SK
```

### getLanguage

```js
import { getLanguage } from 'locale-id';

const value = getLanguage('sk-sk');
console.log(value); // => sk
```

### getCountry

```js
import { getCountry } from 'locale-id';

const value = getCountry('cs-cz');
console.log(value); // => CZ
```

### getScript

```js
import { getScript } from 'locale-id';

const value = getScript('sk-latin-sk');
console.log(value); // => Latin
```

### getVariant

```js
import { getVariant } from 'locale-id';

const value = getVariant('sr_Latn_RS_REVISED@currency=USD');
console.log(value); // => REVISED
```


### getKeyword

```js
import { getKeyword } from 'locale-id';

const value = getKeyword('sk-latin-sk@currency=USD');
console.log(value); // => currency=USD
```

### normalizeAcceptLanguage

```js
import { normalizeAcceptLanguage } from 'locale-id';

const value = normalizeAcceptLanguage('da, en-gb;q=0.8, en;q=0.7');
console.log(value); // => ['da', 'en_GB', 'en']
```

### getBest

```js
import { getBest } from 'locale-id';

getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'en-uk').should.equal('en_UK');
getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'en-br').should.equal('en');
getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'sk-SK').should.equal('sk_SK');

should(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'sk-md')).equal(void 0);
should(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'sk-md', 'en')).equal('en');
should(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'sk-md', 'en', true)).equal('sk_SK');

should(getBest(['en_US', 'en_UK', 'sk_SK'], 'en-US', 'sk_SK', true)).equal('en_US');
should(getBest(['en_US', 'en_UK', 'sk_SK'], 'en', 'sk_SK', true)).equal('en_US');
```

You can speed up getBest function:

```js
import { getBest, prepareSupported } from 'locale-id';

const supported = prepareSupported(['en', 'en_US', 'en_UK', 'sk_SK']);

getBest(supported, 'en-uk').should.equal('en_UK');
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
