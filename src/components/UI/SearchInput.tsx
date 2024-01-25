import React, {useState} from 'react';
import SearchInputCSS from '../../styles/navbar/searchInput.module.css';
import {useWeather} from "./WeatherContext";
import {v4 as uuidv4} from "uuid";
import {useTranslation} from "react-i18next";

interface SearchInputProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    searchResults: {id:number; name: string; country: string; lat:string; lon:string; state: string}[];
    setSearchResults: (results: { id: number; name: string; country: string; lat: string; lon: string; state: string }[]) => void;
    isFocused: boolean;
    handleFocus: () => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    isFocused,
    handleFocus,
    handleBlur,
}) => {
    const {t, i18n} =useTranslation()
    const { setUpdateCounter } = useWeather();
    const [selectedCity, setSelectedCity] = useState<any>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            setSearchResults([]);
        }
    };

    const handleResultClick = (result: any) => {
        // Обработка нажатия на результат поиска
        console.log('Clicked on result:', result);
        setSelectedCity(result);
    };


    const handleAddButtonClick = () => {
        if (selectedCity) {
            // Сохранение выбранного города в localStorage
            const cityToAdd = {
                name: selectedCity.name,
                country: selectedCity.country,
                lat: selectedCity.lat,
                lon: selectedCity.lon,
                id: uuidv4(),
            };
            const savedCities = JSON.parse(localStorage.getItem('cities') || '[]');
            console.log('Before adding:', savedCities);
            savedCities.push(cityToAdd);
            console.log('After adding:', savedCities);
            localStorage.setItem('cities', JSON.stringify(savedCities));

            setSelectedCity(null);
        }
        setUpdateCounter((prevCounter) => prevCounter + 1);
    };


    return (
        <div>
            <div className={SearchInputCSS.wrapper}>
                <div className={SearchInputCSS.placeholder}>
                    <input
                        className={SearchInputCSS.input}
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                    <label className={SearchInputCSS.placeholderLabel}>{t("search")}</label>
                </div>
                <div className={SearchInputCSS.addbtn}>
                    <button onClick={handleAddButtonClick}>{t("search-btn")}</button>
                </div>
            </div>

            { isFocused && searchResults.length > 0 && (
                <div className={SearchInputCSS.searchResultsContainer}>
                    {searchResults.map((result) => (
                        <div
                            key={`${result.name}-${result.lat}-${result.lon}`}
                            className={`${SearchInputCSS.searchResult} ${selectedCity === result ? SearchInputCSS.selected : ''}`}
                            onClick={() => handleResultClick(result)}
                        >
                            {result.name}, {result.country}, {result.state}
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
};

export default SearchInput;
