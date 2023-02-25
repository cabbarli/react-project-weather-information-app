import React, { useState, useEffect } from "react";
import { usePosition } from "use-position";
import axios from "axios";
import '../App.css';


export default function Weather() {
 

  const watch = true;
  const { latitude, longitude } = usePosition(watch);


  const [name, setName] = useState();
  const [temp, setTemp] = useState();
  const [country, setCountry] = useState();
  const [wind, setWind] = useState();
  const [description, setDescription] = useState();

  const weatherProqnoz = async(lat, lon) => {

  const APIKEY = process.env.REACT_APP_KEY;


  const lang = navigator.language.split("-")[0];
  console.log(lang);


    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&lang=${lang}`
      );
      setName(data.name);
      setTemp(Math.ceil(data.main.temp - 273, 15));
      setCountry(data.sys.country);
      setWind(data.wind.speed);
      setDescription(data.weather.map((dat) => dat.description));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    latitude && longitude && weatherProqnoz(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div className="App">
      <h1 className="info">Hava məlumatı</h1>
      <h3>Şəhər adı: {name} </h3>
      <h3>Koordinant en: {latitude}</h3>
      <h3>Koordinant uzun: {longitude}</h3>
      <h3>Havanın temperaturu: {temp} &#8451;</h3>    
      <h3>Küləyin sürəti: {wind}</h3>
      <h3>Ölkə: {country}</h3>
      <h3>Hava durumu: {description}</h3>
    </div>
  );
}
