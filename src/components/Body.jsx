import React, {useState ,useEffect, useRef} from 'react'
import clouds from "../assets/clouds.png"
import mist from "../assets/mist.png"
import cloudy from "../assets/cloudy.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import heavyrain from "../assets/heavy-rain.png"
import humidity from "../assets/humidity.png"
import snowflake from "../assets/snowflake.png"
import sun from "../assets/sun.png"
import wind from "../assets/wind.png"

import './Body.css'


const Body = () => {

    const inputRef = useRef()

    const [weatherData , setWeatherData] = useState(false)

    const allIcons = {
        "01d": sun,
        "01n":sun,
        "02d":cloudy,
        "02n":cloudy,
        "03d":clouds,
        "03n":clouds,
        "04d":clouds,
        "04n":clouds,
        "09d":rain,
        "09n":rain,
        "10d":drizzle,
        "10n":drizzle,
        "11d":heavyrain,
        "11n":heavyrain,
        "13d":snowflake,
        "13n":snowflake,
        "50d":mist,
        "50n":mist,
    }

    const search = async(city)=>{
        if(city === ""){
            alert("Enter a City Name")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false)
            console.error("Error in fetching data!!")
            
        }
    }

    useEffect(()=>{
        search("Kolkata")

    },[])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search'/>
        <img src="src/assets/search.png" alt="" onClick={()=>{search(inputRef.current.value)}}/>
      </div>
      {weatherData?<>
      
      <img src={weatherData.icon} alt=''className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='city-name'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
            <img src = {humidity} alt=''/>
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className='col'>
            <img src = {wind} alt=''/>
            <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
    </div>
  )
}

export default Body
