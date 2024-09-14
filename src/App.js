import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const apiKey = '4df984d91c4f6f81447eb1cd17503295';

  useEffect(() => {
    if (location.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${location}&type=like&sort=population&cnt=5&appid=${apiKey}`);
          setSuggestions(response.data.list);
        } catch (error) {
          console.error('Error fetching location suggestions:', error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [location]);

  const searchLocation = (city) => {
    setIsSearching(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url)
      .then((response) => {
        setData(response.data);
        setLocation('');
        setSuggestions([]);
      })
      .catch((error) => {
        alert(error.response.data.message);
        setIsSearching(false);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchLocation(location);
    }
  };

  const handleSuggestionClick = (city) => {
    searchLocation(city);
  };

  return (
    <div className={`app ${isSearching ? 'searching' : ''}`}>
      <div className='search'>
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Enter Location'
          type='text'
        />
         
        <div className='parent'>
        {suggestions.length > 0 && (
          <ul className='autocomplete-list'>
            {suggestions.map((suggestion) => (
              <li className='autocomplete-item'
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.name)}
              >
                {suggestion.name}, {suggestion.sys.country}
              </li>
            ))}
          </ul>
        )}
        </div>
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
            {data.weather ? <p className='bold'>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}&#176;C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}KM/H</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;