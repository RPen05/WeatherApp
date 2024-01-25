import React, {useState, useEffect} from 'react';
import WeatherItem from "../UI/WeatherItem";
import WeatherBlockCSS from "../../styles/weatherBlock/weather.module.css"
import {useWeather} from "../UI/WeatherContext";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import useTemperatureUnit from '../../hooks/useTemperatureUnit'
import useLanguage from "../../hooks/useLanguage";
//  import {combineSlices} from "@reduxjs/toolkit";

interface City {
    id: string;
    lat: number;
    lon: number;
}
const WeatherBlock:React.FC<{defaultWeatherData:any}>= ({defaultWeatherData}) => {
    const [citiesWeather, setCitiesWeather] = useState<any[]>([]);
    const citiesFromLocalStorage = JSON.parse(localStorage.getItem('cities') || '[]');
    const { updateCounter, setUpdateCounter } = useWeather();

    const handleRemoveCity = (idToRemove: string) => {
        return () => {
            console.log('Removing city with id:', idToRemove);

            const savedCities = JSON.parse(localStorage.getItem('cities') || '[]');

            // Находим индекс города с заданным id
            const cityIndexToRemove = savedCities.findIndex((city: City) => city.id === idToRemove);

            if (cityIndexToRemove !== -1) {
                // Если город с таким id найден, удаляем его из массива
                savedCities.splice(cityIndexToRemove, 1);
                localStorage.setItem('cities', JSON.stringify(savedCities));
                setUpdateCounter((prevCounter) => prevCounter + 1);
            } else {
                // Если город с таким id не найден, обработайте это событие по вашему усмотрению
                console.log('Город с таким id не найден:', idToRemove);
            }
        };
    };

    const temperatureUnit = useTemperatureUnit();
    const language = useLanguage();
    useEffect(() => {
        const apiKey = '73a0df1d66166e4fb375ad4d2301fa44';

        // Функция для получения погоды по координатам
        const fetchWeatherByCoordinates =    async (lat: number, lon: number, temperatureUnit:string) => {
            console.log('fetchWeatherByCoordinates temperatureUnit:', temperatureUnit);
            console.log('fetchWeatherByCoordinates language:', language);
            try {

                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${temperatureUnit}&lang=${language}&appid=${apiKey}`,


                );console.log('Response: ', response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching weather data:', error);
                return null;
            }
        };

        // Запрос погоды для каждого города из localStorage

        const fetchCitiesWeather = async () => {
            console.log('fetchWeatherByCoordinates temperatureUnit:', temperatureUnit);
            console.log('fetchWeatherByCoordinates language:', language);
            const weatherDataPromises = citiesFromLocalStorage.map(async (city:City) => {
                const weatherData = await fetchWeatherByCoordinates(city.lat, city.lon, temperatureUnit);
                return weatherData;
            });

            const weatherDataArray = await Promise.all(weatherDataPromises);
            setCitiesWeather(weatherDataArray.filter((weatherData) => weatherData !== null));
        };

        fetchCitiesWeather();
        console.log('WeatherBlock updated!');
    }, [updateCounter, temperatureUnit, language]);

    return (
        <div className={WeatherBlockCSS.weatherCards}>
            {defaultWeatherData &&(
                <WeatherItem key={uuidv4()} weatherData={defaultWeatherData}  onRemove={()=>{}}/>
            )}
            {citiesWeather.map((city) => (
                <WeatherItem key={uuidv4()} weatherData={city} onRemove={()=>handleRemoveCity(city.id)}/>
            ))}
        </div>
    );
};

export default WeatherBlock;