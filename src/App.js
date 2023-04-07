import './App.css';
import {Routes, Route} from 'react-router-dom'
import WeatherCard from './components/weatherDisplayCard';
import Hourlyweather from './components/HourlyWeather';
function App() {
  return (
      <div className="App">
          <Routes>
              <Route exact path="/" element={<WeatherCard/>}/>
              <Route path="/hourly/:city/:date" element={<Hourlyweather/>} />
          </Routes>
          {/* <WeatherCard/> */}
      </div>
  );
}

export default App;
