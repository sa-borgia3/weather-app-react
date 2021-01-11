import axios from "axios";
import React, { Component } from "react";
import DaysWeather from "./components/DaysWeather/DaysWeather";
import TodaySpecs from "./components/TodaySpecs/TodaySpecs";
import TodayWeather from "./components/TodayWeather/TodayWeather";
import styled from "styled-components";
import "./App.css";
import { Card, Grid } from "@material-ui/core";

class App extends Component {
  state = {
    data: "",
    coords: {
      latitude: "",
      longitude: "",
    },
    daysData: [],
  };

  getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayOfWeek];
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ coords: newCoords });
        //console.log(this.state.coords);

        //Axios Call
        axios
          .get("https://api.weatherbit.io/v2.0/current", {
            params: {
              key: `${process.env.REACT_APP_API_KEY}`,
              lat: this.state.coords.latitude,
              lon: this.state.coords.longitude,
              lang: "it",
            },
          })
          .then((res) => {
            const data = res.data.data[0];
            //filter data fetched from API
            let weatherData = {
              weather: data.weather,
              precip: data.precip,
              humidity: data.rh,
              airQuality: data.aqi,
              temp: data.temp,
              sunrise: data.sunrise,
              pressure: data.pres,
              country: data.country_code,
              ts: data.ts,
              city: data.city_name,
              windSpeed: data.wind_spd,
            };
            this.setState({ data: weatherData });
            console.log(this.state.data);
          });

        //Second Api call
        axios
          .get("https://api.weatherbit.io/v2.0/forecast/daily", {
            params: {
              key: `${process.env.REACT_APP_API_KEY}`,
              lat: this.state.coords.latitude,
              lon: this.state.coords.longitude,
              lang: "it",
              days: 8,
            },
          })
          .then((res) => {
            console.log("7 days", res.data.data);
            const data = res.data.data.splice(1);
            this.setState({ daysData: data });
            console.log(this.state.daysData);
          });
      });
    }
  }

  render() {
    let daysWeather = (
      <div className="container">
        {this.state.daysData.map((day, index) => {
          console.log(day);
          return (
            <DaysWeather
              weather={day.weather}
              max={day.max_temp}
              min={day.min_temp}
              precip={day.precip}
              ts={new Date(day.ts * 1000).toLocaleDateString("it-IT")}
            />
          );
        })}
      </div>
    );

    const { data } = this.state;
    //const { daysData } = this.state;
    return (
      <div className="App">
        <h1>App Weather</h1>
        <TodayWeather data={data} />
        {daysWeather}
      </div>
    );
  }
}

export default App;
