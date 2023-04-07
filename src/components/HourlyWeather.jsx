import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Table,Button } from 'reactstrap';



function HourlyWeather() {
  const {city}=useParams();
  let {date}=useParams();
  const [hourlyData, setHourlyData] = useState([]);
  
  let navigate=useNavigate()

  function formatDate(inputDate) {
    const dateParts = inputDate.split("-");
    const year = dateParts[2];
    const month = dateParts[0];
    const day = dateParts[1];
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
   date=formatDate(date)
  const apiKey='194b29404a7425b746dbbed6e7158ecb'
  useEffect(() => {
    async function fetchHourlyData() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
      const data = await response.json();
      const hourlyData = data.list.filter(item => {
        const itemDate = new Date(item.dt * 1000);
        const dateString = itemDate.toISOString().slice(0, 10);
        return dateString === date;
      });
      setHourlyData(hourlyData);
    }
    fetchHourlyData();
  }, [city, date]);

  return (
    <div >
      <h2 className="text-center">Hourly Weather Data for {city} on {date}</h2>
      <div className="d-flex justify-content-center m-5 mb-2">
      <Table dark className="text-center">
        <thead>
          <tr>
            <th>Time</th>
            <th>Weather</th>
            <th>Temperature</th>
            <th>Feels Like</th>
          </tr>
        </thead>
        <tbody>
        {hourlyData.map(item => (
            <tr key={item.dt}>
            
            <td>{new Date(item.dt * 1000).toLocaleTimeString()}</td>
            <td>{item.weather[0].description}</td>
            <td>{Math.round(item.main.temp - 273.15)}°C</td>
            <td><img src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" /></td>
            
            </tr>
      ))}
      </tbody>
      </Table>
      </div>
      
      <div className="d-flex justify-content-center">
        <Button className="size-6" style={{ width: '150px' }} onClick={()=>{
          navigate(`/`)
        }}>Back</Button>
        </div>
    </div>
  );
}

export default HourlyWeather;












//     console.log(date);
//     return(
//         <>
//         <p>{date}</p>
//         <p>{city}</p>
//         </>
//     );

// };

// export default HourlyWeather;

