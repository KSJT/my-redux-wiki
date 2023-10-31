import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Weather.module.scss";

interface Weather {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    deg: number;
    speed: number;
  };
}

const Weather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [cityName, setCityName] = useState<string>("");
  const [temp, setTemp] = useState<number>(0);
  const [weatherStatus, setWeatherStatus] = useState<string>("");
  const [weatherIcon, setWeatherIcon] = useState<string>("");

  const weatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=216596c94f4a4c2933a88cb3bd9f9428&lang=ko&units=metric";

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    setWeatherInfo();
  }, [weather]);

  const getWeather = async () => {
    try {
      const response = await axios.get(weatherAPI);
      setWeather(response.data);
    } catch (error) {
      console.error("날씨 정보를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const setWeatherInfo = () => {
    if (weather) {
      setCityName(weather.name);
      setTemp(weather.main.temp);

      const weatherStatus =
        weather.weather && weather.weather.length > 0
          ? weather.weather[0].main
          : "Unknown";
      setWeatherStatus(weatherStatus);

      const icon =
        weather.weather && weather.weather.length > 0
          ? weather.weather[0].icon
          : "unknown-icon";

      const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      setWeatherIcon(weatherIcon);
    }
  };

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.weather_container}>
        <div>
          <img src={weatherIcon} alt={weatherStatus} />
        </div>
        <div>{cityName}</div>
        <div>{temp}℃</div>
        <div>{weatherStatus}</div>
      </div>
    </>
  );
};

export default Weather;
