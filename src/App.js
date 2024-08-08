import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=4df984d91c4f6f81447eb1cd17503295`

  const searchLocation = (event) => {
    if(event.key==='Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
      }).catch((error) => {
        alert(error.response.data.message)
      })
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className='search'>
        <input
        value={location}
        onChange={e=>setLocation(e.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type='text'/>
      </div>

      <div className='container'>
        
        <div className='top'>

          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}&#176;C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p className='bold'>{data.weather[0].main}</p> : null }
          </div>

        </div>
      
      {data.name !== undefined && 
      
        <div className='bottom'>

          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}&#176;C</p> : null }
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> :null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}KM/H</p> :null}
            <p>Wind Speed</p>
          </div>

        </div>

      }


      </div>
    </div>
  );
}

export default App;
