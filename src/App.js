import React, { Component } from 'react';
import classes from './App.css';
import axios from 'axios';

import AutocompleteInput from "./GoogleComponents/AutocompleteInput/AutocompleteInput";
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather";
import Forecast from "./Components/Forecast/Forecast";
import SavedCities from './Components/SavedCities/SavedCities'

class App extends Component {

  state = {
    cityName: null
  }

  getCityName = name =>{
    this.setState({
      ...this.state,
      cityName: name
    })
  }

  getCityFromGeolocation = ()=>{
    if ("geolocation" in navigator) {

        return new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(function (position) {
                resolve( {
                      lat: position.coords.latitude,
                      long: position.coords.longitude
                    })
                })
      });
    }
  }

  componentDidMount() {
    const cord = this.getCityFromGeolocation();

    cord
    .then(cord => axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${cord.lat},${cord.long}&sensor=false`).then(res =>{

      let city = res.data.results[0].formatted_address;
      city = city.split(', ');
      city.shift();
      city = city[0].split(' ');

      this.setState({...this.state, cityName: city[1]});

    }));


  }



  render() {
    return (
      <div className={classes.App}>
          <h2 className={classes.AppHeader}>Podaj miasto lub skorzystaj z geolokalizacji żeby sprawdzić prognozę pogody.</h2>
          <div className={classes.searchWrapper}>
            <AutocompleteInput cityName={this.getCityName}/>
            <SavedCities cityName={this.state.cityName} clicked={this.getCityName}/>
          </div>
          <CurrentWeather cityName={this.state.cityName}/>
          <Forecast cityName={this.state.cityName}/>
      </div>
    );
  }
}

export default App;
