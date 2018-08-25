import React,{Component  } from "react";
import classes from './CurrentWeather.css'
import axios from 'axios';

const _API_KEY = "b25c40f7f24ed40bbd9add84d8badbd9";


class CurrentWeather extends Component {
    state={
        cityName: this.props.cityName,
        currentWeather: null
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
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${_API_KEY}`)
                .then(res => {
                    const data = res.data;
                    this.setState({
                        ...this.state,
                        currentWeather: {...data}
                    })
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

    render() {
        return (
        <div className={classes.CurrentWeather__wrapper}>
            <pre>{JSON.stringify(this.state.currentWeather, null, 2) }</pre>
        </div>
        );
    }
}

export default CurrentWeather;