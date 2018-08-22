import React, {Component} from "react";
import Autocomplete from 'react-google-autocomplete';


class AutocompleteInput extends Component {

    state={
        cityName: null,
        cityPhoto: null,
        buttonActive: null,

    }

    getValue(e){
        console.log(e.target.value);
    }

    changeHandler =(e)=>{
        let value = (e.target.value).trim();

        if(value.length > 2){
            this.setState({ buttonActive: "active"})
        }else{
            this.setState({ buttonActive: null})
        }

    }
    submitFormHandler(e){
        e.preventDefault();

    }


    render (){


        return (
            <form onSubmit={this.getValue}>
                <Autocomplete
                className="searchInput"
                onPlaceSelected={(place) => {
                    console.log(place)

                    //na wyberanie miasta pobrac wartość z inputa

                }}
                types={['(regions)']}
                placeholder="Podaj nazwe miasta"
                onChange={this.changeHandler}
                />
                <button className={this.state.buttonActive} onClick={this.submitFormHandler} type="submit">Szukaj</button>

            </form>

        );
    }
}

export default AutocompleteInput;