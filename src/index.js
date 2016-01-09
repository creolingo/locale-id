import capitalize from 'lodash/string/capitalize';

// http://userguide.icu-project.org/locale
export default function parse(locale) {
  if (!locale) {
    return void 0;
  }

  // extract keyword
  const stringLocale = String(locale);
  const keywordPos = stringLocale.indexOf('@');

  const keyword = keywordPos !== -1
    ? stringLocale.substr(keywordPos + 1)
    : void 0;

  const localeWithoutKeyword = keywordPos !== -1
    ? stringLocale.substr(0, keywordPos)
    : stringLocale;

  // en-us => en_us
  const parts = String(localeWithoutKeyword)
    .replace(/-/g, '_')
    .split('_');

  if (!parts.length || parts.length > 4) {
    return void 0;
  }

  const language = parts.shift();
  if (!language) {
    return void 0;
  }

  const retVar = {
    keyword,
    language: language.toLowerCase(),
  };

  if (!parts.length) {
    return retVar;
  }

  if (parts.length === 3) {
    const variant = parts.pop();
    if (variant) {
      retVar.variant = variant.toUpperCase();
    }
  }

  let country = parts.pop();
  if (country.length > 3) {
    retVar.keyword = country;

    country = parts.pop();
  }

  if (country) {
    retVar.country = country.toUpperCase();
  }

  if (!parts.length) {
    return retVar;
  }

  const script = parts.pop();
  if (script) {
    retVar.script = capitalize(script.toLowerCase());
  }

  return retVar;
}

export function getLanguage(locale) {
  const obj = parse(locale);
  return obj ? obj.language : void 0;
}

export function getCountry(locale) {
  const obj = parse(locale);
  return obj ? obj.country : void 0;
}

export function getScript(locale) {
  const obj = parse(locale);
  return obj ? obj.script : void 0;
}

export function getVariant(locale) {
  const obj = parse(locale);
  return obj ? obj.variant : void 0;
}

export function getKeyword(locale) {
  const obj = parse(locale);
  return obj ? obj.keyword : void 0;
}

export function normalize(locale, delimeter = '_') {
  const obj = parse(locale);
  if (!obj) {
    return obj;
  }

  let result = obj.language;

  if (obj.script) {
    result += `${delimeter}${obj.script}`;
  }

  if (obj.country) {
    result += `${delimeter}${obj.country}`;
  }

  return result;
}
