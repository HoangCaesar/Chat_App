import { useTranslation } from 'react-i18next';

// Project Import
import { allLangs, defaultLang } from '../config/config';
import useSettings from './useSettings';

// ==============================|| HOOKS: useLocales ||============================== //

const useLocales = () => {
    const { i18n, t: translate } = useTranslation();

    const { onChangeDirectionByLang } = useSettings();

    const langStorage = localStorage.getItem('i18nextLng');

    const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

    const handleChangeLanguage = (newlang: any) => {
        i18n.changeLanguage(newlang);
        onChangeDirectionByLang();
    };

    return {
        onChangeLang: handleChangeLanguage,
        translate: (text: any, options: any) => translate(text, options),
        currentLang,
        allLangs,
    };
};

export default useLocales;
