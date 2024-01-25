import { useState, useEffect } from 'react';
import axios from 'axios';

interface City {
    lat: number;
    lon: number;
}
//Хук чтобы обновлять состояние погоды в карточках (Не используется на данный момент)
//Продумать как избежать бесконечного цикла запросов к api
const useWeatherData = () => {
    const [citiesWeather, setCitiesWeather] = useState<any[]>([]);
    const apiKey = '73a0df1d66166e4fb375ad4d2301fa44';

    // Функция для получения погоды по координатам
    const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${apiKey}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    };

    const updateCitiesWeather = async (cities: City[]) => {
        const weatherDataPromises = cities.map(async (city: City) => {
            const weatherData = await fetchWeatherByCoordinates(city.lat, city.lon);
            return weatherData;
        });

        const weatherDataArray = await Promise.all(weatherDataPromises);
        setCitiesWeather(weatherDataArray.filter((weatherData) => weatherData !== null));
    };

    return { citiesWeather, updateCitiesWeather };
};

export default useWeatherData;
