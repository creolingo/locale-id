import parse, {
  getLanguage,
  normalize,
  getScript,
  getCountry,
  getKeyword,
  getVariant,
  normalizeAcceptLanguage,
  getBest,
} from './index';

describe('LocaleID', () => {
  it('should be able to parse locale IDs', () => {
    expect(parse(undefined)).toBeUndefined();

    expect(parse('sr_Latn_RS_REVISED_dfsdf_dfdf')).toBeUndefined();

    expect(parse('-')).toBeUndefined();

    expect(parse('sk-sk')).toEqual({
      language: 'sk',
      country: 'SK',
    });

    expect(parse('cs-CZ')).toEqual({
      language: 'cs',
      country: 'CZ',
    });

    expect(parse('cs')).toEqual({
      language: 'cs',
    });

    expect(parse('en_US')).toEqual({
      language: 'en',
      country: 'US',
    });

    expect(parse('bm-latn-ml')).toEqual({
      language: 'bm',
      script: 'Latn',
      country: 'ML',
    });

    expect(parse('sr_Latn_RS_REVISED@currency=USD')).toEqual({
      language: 'sr',
      script: 'Latn',
      country: 'RS',
      variant: 'REVISED',
      keyword: 'currency=USD',
    });

    expect(parse('fr@collation=phonebook;calendar=islamic-civil')).toEqual({
      language: 'fr',
      keyword: 'collation=phonebook;calendar=islamic-civil',
    });

    expect(parse('en_IE@currency=IEP')).toEqual({
      language: 'en',
      country: 'IE',
      keyword: 'currency=IEP',
    });

    expect(parse('en_IE_PREEURO')).toEqual({
      language: 'en',
      country: 'IE',
      keyword: 'PREEURO',
    });
  });

  it('should be able to normalize', () => {
    expect(normalize('Bm-latn-ml')).toBe('bm_Latn_ML');
  });

  it('should be able to normalize bad text', () => {
    expect(normalize('-')).toBeUndefined();
  });

  it('should be able to use getLanguage', () => {
    expect(getLanguage('bM-latn-ml')).toBe('bm');
  });

  it('should be able to use getScript', () => {
    expect(getScript('bM-latn-ml')).toBe('Latn');
  });

  it('should be able to use getCountry', () => {
    expect(getCountry('bM-latn-ml')).toBe('ML');
  });

  it('should be able to use getVariant', () => {
    expect(getVariant('sr_Latn_RS_REVISED@currency=USD')).toBe('REVISED');
  });

  it('should be able to use getKeyword', () => {
    expect(getKeyword('sr_Latn_RS_REVISED@currency=USD')).toBe('currency=USD');
  });

  it('should be able to parse acceptLanguage', () => {
    expect(normalizeAcceptLanguage('da, en-gb;q=0.8, en;q=0.7')).toStrictEqual(['da', 'en_GB', 'en']);
  });

  it('should be able to get best match', () => {
    expect(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'en-uk')).toBe('en_UK');
    expect(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'en-br')).toBe('en');
    expect(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'sk-SK')).toBe('sk_SK');

    expect(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'sk-md')).toBeUndefined();
    expect(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'sk-md', 'en')).toBe('en');
    expect(getBest(['en', 'en_US', 'en_UK', 'sk_SK'], 'sk-md', 'en', true)).toBe('sk_SK');

    expect(getBest(['en_US', 'en_UK', 'sk_SK'], 'en-US', 'sk_SK', true)).toBe('en_US');
    expect(getBest(['en_US', 'en_UK', 'sk_SK'], 'en', 'sk_SK', true)).toBe('en_US');

    // select default locale if locale is not supported
    expect(getBest(['en_US', 'sk_SK'], 'cs_CZ', 'sk_SK')).toBe('sk_SK');

    // return undefined if locale is not supported and default locale is not defined
    expect(getBest(['en_US', 'sk_SK'], 'cs_CZ')).toBeUndefined();
  });
});
