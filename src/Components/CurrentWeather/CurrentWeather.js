import React,{Component  } from "react";
import classes from './CurrentWeather.css'
import axios from 'axios';
import ReactTooltip from 'react-tooltip'


const _API_KEY = "b25c40f7f24ed40bbd9add84d8badbd9";


class CurrentWeather extends Component {
    state={
        cityName: this.props.cityName,
        currentWeather: null,
        weather : {
            city: {
                name: null,
                id: null,
                lon: null,
                lat: null
            },
            current: {
                desc: null,
                temp: null,
                press: null,
                humidity: null,
                windSpeed: null,
                clouds: null
            },
            dataInfo: {
                ico: null,
            }
        },
        icoURL : null
    }
    constructor(props){
        super(props)
        this.city=null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cityName !== null && nextProps.cityName !== this.state.cityName) {
            this.setState({
                ...this.state,
                cityName: this.props.cityName
            })
            this.formatCityName(nextProps.cityName);
        } else {
            return;
        }

        if(this.city){
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&lang=pl&APPID=${_API_KEY}`)
                .then(res => {
                    const data = res.data;
                    this.setState({
                        ...this.state,
                        currentWeather: {...data}
                    })
                    this.formatWeatherData(data);
                })
                .catch(err =>{
                    this.setState({
                        ...this.state,
                        currentWeather: "Limit zapytan dla tego klucza API został wyczerpany"
                    })
                })
        }
    }

    formatCityName = city =>{
        const encodeCity = encodeURIComponent(city);
        this.city = encodeCity;
    }

    formatWeatherData = data =>{
        this.setState({
            ...this.state,

            weather : {
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
            icoURL: `http://openweathermap.org/img/w/${this.state.currentWeather.weather[0].icon}.png`
        })
    }

    render() {
        let renderThis = this.state.currentWeather;
        let weatherDOM = render =>{
            if (render) {
                return (
                <div className={classes.CurrentWeather__wrapper}>
                    <div className={classes.city__wrapper}>
                        <div className={classes.cityInfo__wrapper}>
                            <h3 className={classes.cityName}>{this.state.weather.city.name}</h3>
                            <span className={classes.cityMeta}>Dane geograficzne: lon {this.state.weather.city.lon}, lat {this.state.weather.city.lat}</span>
                            <h4 className={classes.weather__desc}>{this.state.weather.current.desc}</h4>
                            <div className={classes.ico__wrapper}>
                            <img  src={this.state.icoURL} alt="Ikona pogody"></img>
                            </div>
                        </div>
                        <div className={classes.weather__details}>
                            <h3 className={classes.weather__currentTemp}>{this.state.weather.current.temp}℃</h3>
                            <div className={classes.weather__adds__wrapper}>
                                <h4 className={classes.weather__press} data-tip="Ciśnienie"><span className="ico ico__press"></span> {this.state.weather.current.press}hPa</h4>
                                <h4 className={classes.weather__humidity} data-tip="Wilgodność"><span className="ico ico__humidity"></span> {this.state.weather.current.humidity}%</h4>
                                <h4 className={classes.weather__wind} data-tip="Wiatr"><span className="ico ico__wind"></span> {this.state.weather.current.windSpeed}mps</h4>
                                <h4 className={classes.weather__clouds} data-tip="Zachmurzenie"><span className="ico ico__cloud"></span> {this.state.weather.current.clouds}%</h4>
                            </div>
                        </div>

                    </div>

                <ReactTooltip />
                </div>
                )
            }else{
                return ''
            }
        }

        return ( weatherDOM(renderThis) );
    }
}

export default CurrentWeather;