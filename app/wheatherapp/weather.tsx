'use client';

//importss
import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaSun, FaCloudSun, FaCloudShowersHeavy, FaSnowflake, FaBolt, FaSmog, FaTachometerAlt, FaTint } from 'react-icons/fa';


// Define TypeScript interfaces for the weather data
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string; 
  }>;
}

interface ErrorType {
  message: string;
}


//my api key
const apikey1 = process.env.NEXT_PUBLIC_API_KEY;


//weather app component
export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [city, setCity] = useState<string>(''); // State for the city name
  const [clicked, setClicked] = useState<boolean>(false);


  // Memoize fetchData function to avoid creating a new function on each render
  const fetchData = useCallback(async () => {
    if (!city) return; // Don't fetch if the city is empty
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey1}&units=metric`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError({ message: error.message });
      } else {
        setError({ message: 'An unknown error occurred' });
      }
    } finally {
      setLoading(false);
    }
  }, [city]); 


  //function for get weather button
  const handleButtonClick = () => {
    if (city === " ") {
      return "Please enter a city name"
    }
    setClicked(true);
    fetchData();
  };


   //function for clear input and desplay button
  const clearButtonHandle = () => {
    setWeatherData(null);
    setCity("");
    setClicked(false);
  };


  //using react icons
  const getWeatherIcon = (description: string) => {
    if (/clear/i.test(description)) return <FaSun />;
    if (/cloud/i.test(description)) return <FaCloudSun />;
    if (/rain/i.test(description)) return <FaCloudShowersHeavy />;
    if (/snow/i.test(description)) return <FaSnowflake />;
    if (/storm/i.test(description)) return <FaBolt />;
    if (/fog|haze/i.test(description)) return <FaSmog />;
    return <FaCloudSun />; 
  };


  //jsx
  return (
    <div className='p-4'>
      {/* peragraph */}
      <p className='text-sm font-medium text-gray-500 mb-4'>Search for the current weather condition in your city</p>
     
     {/* input filed */}
      <Input 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city" 
        className='mb-4 outline-none border border-gray-400 rounded-xl bg-white'
      />

      {/* buttons */}
      <div className='flex flex-col md:flex-row justify-center md:space-x-2 p-3 md:space-y-0 space-y-3'>
        <Button onClick={handleButtonClick} className='bg-gray-900 text-white rounded-xl hover:text-black hover:bg-gray-500'>Get Weather</Button>
        <Button onClick={clearButtonHandle} className='bg-gray-900 text-white rounded-xl hover:text-black hover:bg-gray-500'>Clear</Button>
      </div>
      
      {/* loading and error statment ui */}
      {loading && !weatherData && clicked && <div>Loading...</div>} 
      {error && !weatherData && clicked && <div>Error: {error.message}</div>}

      {/* display weather data with react icons*/}
      {weatherData && clicked && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold mb-2'>
            Current weather in {weatherData.name}
          </h2>
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center space-x-2'>
              {getWeatherIcon(weatherData.weather[0].description)}
              <p className='ml-2'>Temperature: {weatherData.main.temp}°C</p>
            </div>
            <div className='flex items-center space-x-2'>
              <FaTint />
              <p className='ml-2'>Humidity: {weatherData.main.humidity}%</p>
            </div>
            <div className='flex items-center space-x-2'>
              <FaTachometerAlt />
              <p className='ml-2'>Pressure: {weatherData.main.pressure} hPa</p>
            </div>
            <div className='flex items-center space-x-2'>
              {getWeatherIcon(weatherData.weather[0].description)}
              <p className='ml-2'>Weather: {weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
