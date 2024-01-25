import React, {useEffect, useState} from 'react';
import useDefaultWeatherData from "../../hooks/useDefaultWeatherData";
import WeatherBlock from "./WeatherBlock";

const MainPage: React.FC = () => {
    const defaultWeatherData = useDefaultWeatherData();

    return (
        <div>
            {defaultWeatherData &&(
                <WeatherBlock defaultWeatherData={defaultWeatherData}/>
            )}
        </div>
    );
};

export default MainPage;