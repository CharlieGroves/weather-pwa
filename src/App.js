import React, { useState } from 'react'

import { fetchWeather } from './api/fetchWeather'
import './App.css'

export default function App() {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState('')

    const search  = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);

            setWeather(data)
            setQuery('')
        }
    }
    

    var UTCHours = new Date().getUTCHours()
    var UTCMins = new Date().getUTCMinutes()

    var timeInPlacePastUTC = weather.timezone
    var minsInPlacePastUTC = timeInPlacePastUTC/60
    var hoursInPlacePastUTC = minsInPlacePastUTC/60

    var minsInPlace = minsInPlacePastUTC
    var hoursInPlace = hoursInPlacePastUTC

    if (hoursInPlacePastUTC % 1 === 0) {
        hoursInPlace = UTCHours + hoursInPlacePastUTC
        if (hoursInPlace >= 25) {
            let timeDifferenceHours = hoursInPlace - 24
            hoursInPlace-=timeDifferenceHours
        }
    } else {
        minsInPlace = UTCMins + minsInPlace
        if (minsInPlace >= 60) {
            let timeDifferenceMins = minsInPlace - 60
            minsInPlace-=timeDifferenceMins
        }
    }

    if (((hoursInPlace / 0.5) % 2) === 1) {
        hoursInPlace-=0.5
        minsInPlace+=30
    }

    //var currentTime = today.getTimezoneOffset()
    console.log(hoursInPlace + ':' + UTCMins)
    console.log(timeInPlacePastUTC)
    console.log(minsInPlacePastUTC)


    return (
        <div className='main-container'>
            <input  type = 'text'  className='search' placeholder='Search...' value = {query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
            {weather.main && (
                <div className='city'>
                    <h2 className='city-name'>
                        <span>{weather.name}</span>
                            <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className='city-temp'>
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className='info'>
                    <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                    <p>{weather.weather[0].description}</p>
                    <p>{ hoursInPlace + ':' + minsInPlace }</p>
                    </div>
                </div>
            )}
        </div>
    )
}
