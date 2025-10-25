import { defaultLang, translations, type Language } from './translations';

export function getLangFromUrl(url: URL): Language {
  if (!url || !url.pathname) return defaultLang;
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string) {
    if (!key) {
      console.warn('Translation key is undefined or empty');
      return '';
    }
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[lang];

    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value;
  };
}

export function getTranslation(lang: Language, key: string) {
  if (!key) {
    console.warn('Translation key is undefined or empty');
    return '';
  }
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[lang];

  for (const k of keys) {
    value = value[k];
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return value;
}
