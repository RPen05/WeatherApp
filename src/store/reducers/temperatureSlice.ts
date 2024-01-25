import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from "immer";

interface TemperatureState {
    unit: 'metric' | 'imperial';
}

const initialState: TemperatureState = {
    unit: 'metric',
};

const temperatureSlice = createSlice({
    name: 'temperature',
    initialState,
    reducers: {
        setTemperatureUnit: (state, action: PayloadAction<'metric' | 'imperial'>) => {
            console.log('setTemperatureUnit action:', action); // Добавим это
            state.unit = action.payload;
        },
    },
});

export const { setTemperatureUnit } = temperatureSlice.actions;
export default temperatureSlice.reducer;