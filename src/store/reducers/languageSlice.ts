import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
interface Language{
    lang: 'ru' | 'en' | 'ua';
}

const storedLang = localStorage.getItem('language');
const initialState: Language = {
    lang: storedLang ? (storedLang as 'ru' | 'en' | 'ua') : 'ru',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguageParam: (state, action: PayloadAction<'ru' | 'en' | 'ua'>) => {
            console.log('setLanguageParam action:', action); // Добавим это
            state.lang = action.payload;
            localStorage.setItem('language', action.payload);
        },
    },
})
export const { setLanguageParam } = languageSlice.actions;
export default languageSlice.reducer;