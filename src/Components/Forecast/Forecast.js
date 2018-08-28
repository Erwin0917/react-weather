import React, { Component } from 'react';
import classes from './Forecast.css';

import axios from 'axios';
import ReactTooltip from 'react-tooltip'
import Swiper from 'react-id-swiper';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/pl';

const _API_KEY = "29d5afe65ca65594abc30012dab7ae6e";

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
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&lang=pl&APPID=${_API_KEY}`)
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
        })
    }


    render() {
        const params = {
            spaceBetween: 30,
            slidesPerView: 3,
            containerClass: classes.slider__wrapper,
            autoplay: {
                delay: 3500,
            },
            breakpoints: {
                    800: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    550: {
                        slidesPerView: 1,
                        spaceBetween: 5
                    },
            },
            grabCursor: true

        }


        let renderForecast = (forecast) =>{
            if(forecast){
                return (
                    forecast.map( (day, i) =>{
                        return (
                            <div key={i} className={classes.day__wrapper}>
                                <h4 className={classes.day}><Moment locale="pl" format="dddd">{day[0].dt_txt.split(' ')[0]}</Moment> <span>{day[0].dt_txt.split(' ')[0]}</span></h4>
                                <Swiper {...params} >
                                    {day.map( hour => (
                                        <div key={hour.dt_txt} className={classes.hour__wrapper}>
                                                <h4 className={classes.hour__title}>Godzina: {hour.dt_txt.split(' ')[1].slice(0, 5)}</h4>
                                                <div className={classes.hour__details}>
                                                    <div className={classes.hour__temp__wrapper}>
                                                        <p>{hour.main.temp}℃</p>
                                                        <div className={classes.ico__wrapper}>
                                                            <img  src={`https://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="Ikona pogody - godzinowa"></img>
                                                        </div>
                                                    </div>
                                                    <div className={classes.hour__weather}>
                                                        <p data-tip="Ciśnienie"><span className="ico ico__press"></span>{hour.main.pressure}hPa</p>
                                                        <p data-tip="Wilgodność"><span className="ico ico__humidity"></span>{hour.main.humidity}%</p>
                                                        <p data-tip="Wiatr"><span className="ico ico__wind"></span>{hour.wind.speed}mps</p>
                                                        <p data-tip="Zachmurzenie"><span className="ico ico__cloud"></span>{hour.clouds.all}%</p>
                                                    </div>
                                                </div>
                                        </div>
                                    ))}
                                </Swiper>

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
                <ReactTooltip />
            </div>
        );
    }
}

export default Forecast;