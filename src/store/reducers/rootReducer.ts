import { combineReducers } from '@reduxjs/toolkit';
import temperatureReducer from './temperatureSlice';
import languageReducer from './languageSlice'

const rootReducer = combineReducers({
    temperature: temperatureReducer,
    language: languageReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;