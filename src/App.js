import React, { Component } from 'react';
import classes from './App.css';

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
