import React, {Component} from 'react';
import classes from './SavedCities.css'

class SavedCities extends Component{

    state={
        cities : []
    }


    componentWillReceiveProps(nextProps){
        if(nextProps !== null){

            if (this.state.cities.indexOf(nextProps.cityName) === -1) {
                let newArray;
                if (this.state.cities.length > 2){
                    let tempArr = [...this.state.cities];
                    tempArr.pop();
                    newArray = [nextProps.cityName,...tempArr]

                }else{
                    newArray = [...this.state.cities, nextProps.cityName];
                }

                this.setState({
                    ...this.state,
                    cities: newArray
                })

                this.saveInLocal(newArray);
            }
        }
    }

    saveInLocal = array =>{

    }

    render(){
        let citiesList = <ul className={classes.SavedCities__list}>
                    {this.state.cities.map( city =>{
                        return(
                            <li key={city}><button>{city}</button></li>
                        )
                    } )}

                </ul>
        return (
            <div className={classes.SavedCities__wrapper}>
                <h3>Ostatnio wybierane miasta:</h3>
                {this.state.cities.length > 0 ? citiesList : ''}
            </div>
        );
    }
};

export default SavedCities;