import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import {useNavigate} from "react-router-dom";
import {Button} from "reactstrap"

const apiKey = '194b29404a7425b746dbbed6e7158ecb';

function ForecastCard({ day ,city }) {
  const { dt, main, weather } = day;
  const date = new Date(dt * 1000).toLocaleDateString();
  const iconUrl = `http://openweathermap.org/img/w/${weather[0].icon}.png`;

  let navigate=useNavigate()
  return (
    <div style={{ height: '250px', width:'auto' }}>
    
    <Card className='mx-2' style={{ height: '300px', width:'180px' }}>
      <CardImg className='mx-auto' style={{ width: '100px', height: '100px'}}src={iconUrl} alt="Weather icon" />
      <CardBody>
        <CardTitle tag="h5" id="date">{date}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {weather[0].description}
        </CardSubtitle>
        <div>{main.temp}°C</div>
        <div> High: {main.temp_max}°C </div>
        <div>Low: {main.temp_min}°C </div>
        <Button className="my-2" onClick={()=>{
          {const date=document.getElementById('date').innerText}
          navigate(`/hourly/${city}/${date.replaceAll('/','-')}`)
        }}>Hourly weather</Button>
      </CardBody>
    </Card>
    </div>
  );
}


function DailyForecast({ city }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecast(response.data.list.filter((d, i) => i % 8 === 0));
    }
    fetchData();
  }, [city]);

  return (
    <>
      <h5 style={{marginBottom:'1.5rem'}}>{city} Daily Forecast</h5>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {forecast.map((day) => (
          <ForecastCard key={day.dt} day={day} city={city} />
          ))}
      </div>
    </>
  );
}

export default DailyForecast;