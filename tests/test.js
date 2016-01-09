import should from 'should';
import parse, { getLanguage, normalize, getScript, getCountry, getKeyword, getVariant } from '../src';

describe('LocaleID', () => {
  it('should be able to parse locale IDs', () => {
    should(parse(void 0)).equal(void 0);

    should(parse('sr_Latn_RS_REVISED_dfsdf_dfdf')).equal(void 0);

    should(parse('-')).equal(void 0);

    parse('sk-sk').should.containEql({
      language: 'sk',
      country: 'SK',
    });

    parse('cs-CZ').should.containEql({
      language: 'cs',
      country: 'CZ',
    });

    parse('cs').should.containEql({
      language: 'cs',
    });

    parse('en_US').should.containEql({
      language: 'en',
      country: 'US',
    });

    parse('bm-latn-ml').should.containEql({
      language: 'bm',
      script: 'Latn',
      country: 'ML',
    });

    parse('sr_Latn_RS_REVISED@currency=USD').should.containEql({
      language: 'sr',
      script: 'Latn',
      country: 'RS',
      variant: 'REVISED',
      keyword: 'currency=USD',
    });

    parse('fr@collation=phonebook;calendar=islamic-civil').should.containEql({
      language: 'fr',
      keyword: 'collation=phonebook;calendar=islamic-civil',
    });

    parse('en_IE@currency=IEP').should.containEql({
      language: 'en',
      country: 'IE',
      keyword: 'currency=IEP',
    });

    parse('en_IE_PREEURO').should.containEql({
      language: 'en',
      country: 'IE',
      keyword: 'PREEURO',
    });
  });

  it('should be able to normalize', () => {
    normalize('Bm-latn-ml').should.equal('bm_Latn_ML');
  });

  it('should be able to normalize bad text', () => {
    should(normalize('-')).equal(void 0);
  });

  it('should be able to use getLanguage', () => {
    getLanguage('bM-latn-ml').should.equal('bm');
  });

  it('should be able to use getScript', () => {
    getScript('bM-latn-ml').should.equal('Latn');
  });

  it('should be able to use getCountry', () => {
    getCountry('bM-latn-ml').should.equal('ML');
  });

  it('should be able to use getVariant', () => {
    getVariant('sr_Latn_RS_REVISED@currency=USD').should.equal('REVISED');
  });

  it('should be able to use getKeyword', () => {
    getKeyword('sr_Latn_RS_REVISED@currency=USD').should.equal('currency=USD');
  });
});
