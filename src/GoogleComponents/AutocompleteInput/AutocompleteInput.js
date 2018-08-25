import React, {Component} from "react";
import Autocomplete from 'react-google-autocomplete';
import Button from "../../Buttons/Button/Button";

import classes from  './AutocompleteInput.css';


class AutocompleteInput extends Component {

    state={
        cityPhoto: null,
        buttonActive: null,
        buttonIsValide: true
    }

    handleSubmit= e => {
        e.preventDefault();
        const input = document.querySelector('.searchInput');

        let value = input.value;

        this.valideForm(value)

        if(value.length > 2){
            this.props.cityName(value);
        }else{
            this.props.cityName(null);
        }

      }

      valideForm = value =>{
        if(value.length < 3){
            this.setState({
                ...this.state,
                 buttonIsValide: false
                })
        }else{
            this.setState({
                ...this.state,
                 buttonIsValide: true
                })
        }
      }

      handleChange = e =>{
          const val =e.target.value;

          if(val.length > 2){
              this.setState({
                  ...this.state,
                  buttonActive: 'active'
              })
          }else{
            this.setState({
                ...this.state,
                buttonActive: false
            })
          }
      }


    render (){

        return (
            <form onSubmit={this.handleSubmit} >
                <Autocomplete
                className={`${classes.searchInput} ${this.state.buttonIsValide ? '' : classes.error}`}
                onPlaceSelected={(place) => {
                }}
                types={['(regions)']}
                placeholder="Podaj nazwe miasta"
                onChange={this.handleChange}
                />
                <Button isActive={this.state.buttonActive} isValide={this.state.buttonIsValide}  addClass="search"  type="submit" text="Szukaj"></Button>


            </form>

        );
    }
}

export default AutocompleteInput;