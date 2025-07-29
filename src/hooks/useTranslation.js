import { useLanguage } from '../contexts/LanguageContext';
import { zh } from '../translations/zh';
import { en } from '../translations/en';

const translations = {
  zh,
  en
};

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };
  
  return { t };
};