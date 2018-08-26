import React, { Component } from 'react';
import classes from './Forecast.css';

import axios from 'axios';
import ReactTooltip from 'react-tooltip'

const _API_KEY = "29d5afe65ca65594abc30012dab7ae6e"

class Forecast extends Component {
    state={
        cityName: this.props.cityName,
        forecast: null,
        renderThis: null
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.cityName !== null && nextProps.cityName !== this.state.cityName) {
            this.setState({
                ...this.state,
                cityName: nextProps.cityName,
                forecast: null,
            })
            this.formatCityName(nextProps.cityName);
        } else {
            return;
        }

        if (this.city) {
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&lang=pl&APPID=${_API_KEY}`)
                .then(res => {
                    const data = res.data;
                    this.formatWeatherData(data);
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        ...this.state,
                        forecast: "Limit zapytan dla tego klucza API został wyczerpany"
                    })
                })
        }
    }

    formatCityName = city => {
        const encodeCity = encodeURIComponent(city);
        this.city = encodeCity;
    }


    formatWeatherData = data => {
        const forecastArr = [];

        let tempArr = [];
        data.list.map( (item) =>{
            if(tempArr.length === 0){
                tempArr.push(item)
            }else if(tempArr[0].dt_txt.split(' ')[0] === item.dt_txt.split(' ')[0]){
                tempArr.push(item)
            }else{
                forecastArr.push(tempArr);
                tempArr = [];
                tempArr.push(item);
            }
        })

        this.setState({
            ...this.state,
            forecast: forecastArr,
            renderThis: true

            /* weather: {
                city: {
                    name: this.state.currentWeather.name,
                    id: this.state.currentWeather.id,
                    lon: this.state.currentWeather.coord.lon,
                    lat: this.state.currentWeather.coord.lat
                },
                current: {
                    desc: this.state.currentWeather.weather[0].description,
                    temp: this.state.currentWeather.main.temp,
                    press: this.state.currentWeather.main.pressure,
                    humidity: this.state.currentWeather.main.humidity,
                    windSpeed: this.state.currentWeather.wind.speed,
                    clouds: this.state.currentWeather.clouds.all
                },
                dataInfo: {
                    ico: this.state.currentWeather.weather[0].icon,
                }
            },
            icoURL: `http://openweathermap.org/img/w/${this.state.currentWeather.weather[0].icon}.png` */
        })
    }


    render() {

        let renderForecast = (forecast) =>{
            if(forecast){
                return (
                    forecast.map( (day, i) =>{
                        return (
                            <div key={i} className={classes.day__wrapper}>
                               {day.map( hour => (
                                   <div key={hour.dt_txt} className={classes.hour__wrapper}>
                                        <p>{hour.dt_txt}</p>
                                   </div>
                              ))}
                            </div>
                        )

                    })
                )




            }else{
                return '';
            }
        }

        return (
            <div className={classes.wrapper}>
                {this.state.renderThis ? renderForecast(this.state.forecast) : ''}
            </div>
        );
    }
}

export default Forecast;