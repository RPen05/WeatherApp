import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';

interface useSearchResult {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchResults: any[]; // Замените на более конкретный тип, если возможно
    setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
    isFocused: boolean;
    handleFocus: () => void; // Обновлено
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const useSearch = (): useSearchResult => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            if (query.trim() !== '') {
                try {
                    const apiKey = '73a0df1d66166e4fb375ad4d2301fa44';
                    axios
                        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=3&lang=ru&appid=${apiKey}`)
                        .then((response) => {
                            setSearchResults(response.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching search results: ', error);
                        });
                } catch (error) {
                    console.error('Error fetching search results: ', error);
                }
            }
        }, 1000),
        []
    );

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTimeout(() => {
            const relatedTarget = e.relatedTarget || document.activeElement;
            if (!relatedTarget || !relatedTarget.closest('.searchResultsContainer')) {
                setIsFocused(false);
            }
        }, 3000);
    };

    useEffect(() => {
        debouncedSearch(searchTerm);
        // Очистка таймера при каждом изменении searchTerm
        return debouncedSearch.cancel;
    }, [searchTerm, debouncedSearch]);

    return { searchTerm, setSearchTerm, searchResults, setSearchResults, isFocused, handleBlur, handleFocus };
};

export default useSearch;
