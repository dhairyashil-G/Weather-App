import React, { useState, useEffect } from 'react';
import DailyWeather from "./DailyWeather"
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import "./weatherDisplayCard.css"

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Boston');
  useEffect(() => {
    async function fetchData() {
      const apiKey = '194b29404a7425b746dbbed6e7158ecb';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      try {
        const response = await axios.get(apiUrl);
        setWeather(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setWeather(null);
  };

  return (
    <>
      <Container className="my-4">
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicCity">
            <Form.Control type="text" className="search" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>
        </Form>
        {loading && <p></p>}
        {!loading && weather && (
        <div className='display-card'>
            {/* <img src="" width="" alt="My Image"/> */}
            <h1 className='city-name'>{weather.name}</h1>
            <h2 className='city-temperature'>{weather.main.temp}&deg;C</h2>
            <div className='flexbox-div'>
                <ul className='ulist'>
                    <h2 className='city-temperature-minmax'>H {weather.main.temp_min}&deg;C &emsp; L {weather.main.temp_max}&deg;C &emsp; {weather.weather[0].main}</h2>
                </ul>
            </div>
            <DailyWeather city={weather.name}/>
            {/* <h2 className='cloud-description'>{weather.weather[0].main}</h2> */}
        </div>
        )}
        </Container>
      </>
  );
}

export default Weather;
