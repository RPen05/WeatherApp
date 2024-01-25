import React from 'react';
import useSearch from "../../hooks/useSearch";
import SearchInput from "../UI/SearchInput";
import NavbarCSS from "../../styles/navbar/navbar.module.css"
import {useDispatch, useSelector} from "react-redux";
import {setTemperatureUnit} from "../../store/reducers/temperatureSlice";
import {useTranslation} from "react-i18next";
import "i18next";
import {setLanguageParam} from "../../store/reducers/languageSlice";
import { RootState } from '../../store/reducers/rootReducer';

const Navbar: React.FC = () => {
    const {t, i18n}=useTranslation();
   const {
       searchTerm,
       setSearchTerm,
       searchResults,
       setSearchResults,
       isFocused,
       handleFocus,
       handleBlur,
   } = useSearch();
    const dispatch = useDispatch();
    const temperatureUnit = useSelector((state: RootState) => state.temperature?.unit || 'metric');
    const lang = useSelector((state: RootState) => state.language?.lang || 'ru');
    const handleToggleTemperatureUnit = () => {
        const newUnit = temperatureUnit === 'metric' ? 'imperial' : 'metric';
        console.log('handleToggleTemperatureUnit newUnit:', newUnit); // Добавим это
        dispatch(setTemperatureUnit(newUnit));
    };

    const handleChangeLanguage = (language:string) => {
        if (['ru', 'en', 'ua'].includes(language)) {
            i18n.changeLanguage(language);
            console.log('handleChangeLanguage newLang:', language);
            dispatch(setLanguageParam(language as 'ru' | 'en' | 'ua'));
        } else {
            console.error(`Unsupported language: ${language}`);
        }
    };
    return (
        <div className={NavbarCSS.navbar}>
            <div className={NavbarCSS.searchBar}>
                <SearchInput
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    isFocused={isFocused}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                />
            </div>
            <div className={NavbarCSS.settings}>
                <div className={NavbarCSS.metrics}>{t("metrics")}  <button className={NavbarCSS.metricbtn} onClick={handleToggleTemperatureUnit}>{temperatureUnit === 'metric' ? '°C' : '°F'}</button> </div>
                <div className={NavbarCSS.lang}>{t("language")}
                    <button className={`${NavbarCSS.langbtn} ${lang === 'ru' ? NavbarCSS.active : ''}`} onClick={() => handleChangeLanguage('ru')}>ru</button>
                    <button className={`${NavbarCSS.langbtn} ${lang === 'en' ? NavbarCSS.active : ''}`} onClick={() => handleChangeLanguage('en')}>en</button>
                    <button className={`${NavbarCSS.langbtn} ${lang === 'ua' ? NavbarCSS.active : ''}`} onClick={() => handleChangeLanguage('ua')}>ua</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;