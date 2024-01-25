import React, {useEffect, useState} from "react";
import axios from "axios";
import useTemperatureUnit from "./useTemperatureUnit";
import useLanguage from "./useLanguage";

const useDefaultWeatherData = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [graph, setGraph]=useState()
    const [locationPermission, setLocationPermission] = useState<boolean>(false);
    const temperatureUnit = useTemperatureUnit();
    const language = useLanguage()
    useEffect(() => {
        const apiKey = '73a0df1d66166e4fb375ad4d2301fa44';
        // Асинхронная функция для получения данных о местоположении и погоде
        const fetchData = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            // Запрос данных о погоде от OpenWeatherMap API по текущему местоположению
                            const weatherResponse = await axios.get(
                                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${temperatureUnit}&lang=${language}&appid=${apiKey}`
                            );

                            setWeatherData(weatherResponse.data);
                        },
                        (error) => {
                            console.error('Error getting user location:', error);
                            setLocationPermission(false);
                        }
                    );
                } else {
                    console.error('Geolocation is not supported by this browser.');
                    setLocationPermission(false);
                }

                // Если разрешение геолокации не было получено или произошла ошибка, использовать дефолтные координаты
                if (!locationPermission) {
                    const defaultLatitude = 44.9572;
                    const defaultLongitude = 34.1108;
                    // Запрос данных о погоде от OpenWeatherMap API с использованием дефолтных координат
                    const defaultWeatherResponse = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${defaultLatitude}&lon=${defaultLongitude}&units=${temperatureUnit}&lang=${language}&appid=${apiKey}`
                    );
                    const graph =await axios.get(` https://api.openweathermap.org/data/2.5/forecast?q=Simferopol&appid=${apiKey} `)
                    setWeatherData(defaultWeatherResponse.data);
                    // setGraph(graph.data)
                    console.log('Response', weatherData);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, [locationPermission, temperatureUnit, language]);
    return weatherData;
};

export default useDefaultWeatherData;