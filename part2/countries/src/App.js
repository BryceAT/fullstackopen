import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './App.css';

const api_key = process.env.REACT_APP_API_KEY

const Filter = (props) => {
  return (
    <div>
        find countries <input value={props.value} onChange={props.onChange}/> 
    </div>
  )
}

const DisplayWeather = ({newCity}) => {
  const [ weather, setWeather ] = useState({}) 
  const [ curCity, setCurCity ] = useState('')

  console.log(`call DisplayWeather with newCity = ${newCity} and curCity = ${curCity}`)

  useEffect(() => {
    if (curCity !== newCity) {
      setCurCity(newCity);
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${newCity}&units=f`)
        .then(response => setWeather(response.data))
    }
  },[newCity, curCity, setCurCity])

  if (weather.location) {
      return (
      <div>
        <h1>
          Weather in {weather.location.name}
        </h1>
        <div>
          temperature: {weather.current.temperature}
        </div>
        <img src={weather.current.weather_icons[0]} alt="weather_icons" width="50" height="50"/> 
        <div>
          wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </div>
      </div>
      )}
return <div> No Weather yet for {newCity} </div>
}
const Display = ({oneCoun}) => {
  return (
    <div>
      <h1>
        {oneCoun.name}
      </h1>
      <div>
        Capital: {oneCoun.capital}
      </div>
      <div>
        population: {oneCoun.population}
      </div>
      <div>
        languages:
      </div>
      <ul>
        {oneCoun.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={oneCoun.flag} alt="countries flag" width="100" height="80"/>
      </div>
  )
}

const Output = (props) => {
  const curC = props.allC.filter(country => country.name.toLowerCase().includes(props.filt.toLowerCase()))
  if (curC.length > 10) {
    return (
      <div> Too many matches, specify another filter</div>
    )
  }
  if (curC.length > 1) {
    return (
      curC.map(country => <div key={country.name}>
                            {country.name}   
                            <button type="submit" 
                                    onClick={props.show(country)}>show</button>
                          </div>)
    )
  }
  if (curC.length === 1){
    return (
    <div>
      <Display oneCoun={curC[0]} />
      <DisplayWeather newCity={curC[0].name} />
    </div>
    )
  }
  return (
    <div>
        No countries fit that filter
    </div>
  )
}


function App() {
  const [ newFilter, setNewFilter ] = useState('')
  const [ allCountries, setAllCountries ] = useState([]) 

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setAllCountries(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleShow = (country) => {
    return () => setNewFilter(country.name)
  }
  return (
    <div >
    <Filter value={newFilter} onChange={handleFilterChange} />
    <Output allC={allCountries} filt={newFilter} show={handleShow} />
    </div>
  );
}

export default App;
