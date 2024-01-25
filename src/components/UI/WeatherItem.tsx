import React, { useState, useEffect} from 'react';
import WeatherItemCSS from "../../styles/weatherBlock/weatherItem.module.css";
import {format, addSeconds} from 'date-fns';
import useTemperatureUnit from "../../hooks/useTemperatureUnit";
import "../../i18n"
import {useTranslation} from "react-i18next";
interface WeatherItemProps{
    weatherData:{
        id: string;
        name: string;
        weather: [
            {
                main: string;
                description: string;
                icon: string;
            }
        ]
        main: {
            temp: number;
            feels_like: number;
            pressure: number;
            humidity: number;

        }
        wind:{
            speed: number;
        }
        sys:{
            country: string;
        }
    }
    onRemove: () => void;
}


const WeatherItem:React.FC<WeatherItemProps> = ({weatherData, onRemove}) => {
    const {t, i18n}=useTranslation();
    const [currentTime, setCurrentTime] = useState(new Date());
    const temperatureUnit = useTemperatureUnit();
    const temperatureSymbol = temperatureUnit === 'metric' ? '°C' : '°F';

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(addSeconds(currentTime, 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTime]);

    return (
        <div>
            <div className={WeatherItemCSS.weatherCard}>
                <div className={WeatherItemCSS.remove} onClick={onRemove}>&times;</div>
                <div className={WeatherItemCSS.weatherItemHeader}>
                    <div className={WeatherItemCSS.weatherItemHeaderLeft}>
                        <div className={WeatherItemCSS.name}>
                            {weatherData.sys && weatherData.sys.country
                                ? `${weatherData.name}, ${weatherData.sys.country}`
                                : 'Unknown Location'}
                        </div>
                        <div className={WeatherItemCSS.data}>
                            {format(currentTime, 'EE')}, {format(currentTime, 'dd.MM.yyyy')}, {format(currentTime, 'hh:mm:ss')}
                        </div>
                    </div>
                    <div className={WeatherItemCSS.weatherItemHeaderRight}>
                        <div className={WeatherItemCSS.img}>
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt=""/>
                        </div>
                        <div className={WeatherItemCSS.weatherState}>{weatherData.weather[0].description}</div>
                    </div>
                </div>
                <div className={WeatherItemCSS.weatherItemBody}>
                    Graph
                </div>
                <div className={WeatherItemCSS.weatherItemFooter}>
                    <div className={WeatherItemCSS.weatherItemFooterLeft}>
                        <div className={WeatherItemCSS.weatherItemFooterTemp}>
                            <div className={WeatherItemCSS.temp}>{weatherData.main.temp >= 0 ? `+${Math.round(weatherData.main.temp)}` : Math.round(weatherData.main.temp)}</div>
                            <div className={WeatherItemCSS.metrics}>{temperatureSymbol}</div>
                        </div>
                        <div className={WeatherItemCSS.weatherItemFooterFellslike}>
                            {t("felslike")} {weatherData.main.feels_like >= 0 ? `+${Math.round(weatherData.main.feels_like)}` : Math.round(weatherData.main.feels_like)} {temperatureSymbol}
                        </div>
                    </div>
                    <div className={WeatherItemCSS.weatherItemFooterRight}>
                        <div className={WeatherItemCSS.weatherParamsWind}>{t("wind")} <span>{weatherData.wind.speed}m/s</span></div>
                        <div className={WeatherItemCSS.weatherParamsHumidity}>{t("humidity")} <span>{weatherData.main.humidity}%</span></div>
                        <div className={WeatherItemCSS.weatherParamsPressure}>{t("pressure")} <span>{weatherData.main.pressure}Pa</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherItem