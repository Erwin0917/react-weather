import React, { Component } from 'react';
import './App.css';
import AutocompleteInput from "./GoogleComponents/AutocompleteInput/AutocompleteInput";

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="searchWrapper">
            <AutocompleteInput/>
          </div>
      </div>
    );
  }
}

export default App;
