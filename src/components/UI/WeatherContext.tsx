import React, { createContext, useContext, useState } from 'react';

interface WeatherContextProps {
    updateCounter: number;
    setUpdateCounter: React.Dispatch<React.SetStateAction<number>>;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [updateCounter, setUpdateCounter] = useState(0);

    return (
        <WeatherContext.Provider value={{ updateCounter, setUpdateCounter }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
