import React, { useEffect, useState } from 'react'
import {  useDispatch,useSelector } from 'react-redux'
import { fetchWeatherAction } from '../redux/slices/weatherSlice'


const Content = () => {
    const [city , setCity]=useState('kerala')
      //dispatch action
   const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(fetchWeatherAction('kerala'))
    
  
  },[dispatch])
 //select state from store
 const state = useSelector(state => state)


 const {weather,loading,error} = state;
console.log('====================================');
console.log(weather);
console.log('====================================');

if (!weather) {
    return null; // or you can render a loading spinner
  } 
    console.log(weather.data.main.temp);

 
   const convertToCelsius = (fahrenheit) => {
    return Math.ceil(((fahrenheit - 32) * 5) / 9);
  };



  return (
    < >
<div
  className="bg-neutral-500 bg-cover bg-center h-screen"
  style={{ backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/989/568/920/spectrum-of-the-sky-hdtv-1080p-hd-wallpaper-19d0081d715a9dbbb6d7c87f90a196ed.jpg)' }}
>

     <div className="flex flex-col items-center justify-center pt-32 ">
  <p className="text-2xl font-semibold mb-4 text-cyan-50 bg-slate-500/60">
    Find out the current weather situation around the world
  </p>
  <div className="flex items-center space-x-2">
    <input
      placeholder="Search City"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="border border-gray-300 p-2 rounded-lg"
    />
    <button
      onClick={() => dispatch(fetchWeatherAction(city))}
      type="button"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Search
    </button>
  </div>
</div>

      

<div className="bg-blue-200/50 p-8 rounded-lg shadow-md w-1/2 h-auto mt-32 mx-auto my-auto flex items-center">
  <div className="text-center">
    <div className="flex justify-center items-center">
      <img
        src={`https://openweathermap.org/img/wn/${weather?.data.weather[0].icon}@2x.png`}
        alt=""
        className="w-16 h-16 md:w-24 md:h-24 icon-bottom-right"
      />
      <img
        src={`https://openweathermap.org/img/wn/${weather?.data.weather[0].icon}@2x.png`}
        alt=""
        className="w-16 h-16 md:w-24 md:h-24 icon-top-left"
      />
    </div>
    <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
      {weather?.data.weather[0].main}
    </h1>
    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
      {convertToCelsius(weather?.data.main.temp)}
      <span className="text-2xl md:text-3xl temperature-unit">°C</span>
    </h1>
    <h1 className="text-lg md:text-xl">
      {weather?.name}, {weather?.data.sys?.country}
    </h1>
    <p className="text-sm md:text-base text-red-950">
      The weather condition in {weather?.data.name},{' '}
      {weather?.data.sys?.country} is described as:{' '}
      {weather?.data.weather[0].description} with a temperature of{' '}
      {convertToCelsius(weather?.data.main.temp)}°C and humidity of{' '}
      {weather?.data.main?.humidity}%. The wind speed is{' '}
      {weather?.data.wind.speed} km/h.
    </p>
  </div>
</div>
</div>

    </>
  )
}

export default Content
