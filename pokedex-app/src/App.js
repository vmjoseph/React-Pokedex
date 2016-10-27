import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {value: ''}; 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   // console.log('Text field value is: ' + this.state.value);
   
   axios.get('https://pokeapi.co/api/v2/pokemon/'+ this.state.value+ '/')
		.then(function (response) {
		console.log(response.data); // ex.: { user: 'Your User'}
		console.log(response.status); // ex.: 200
		
		
		
		})
		.catch(function (error) {
			console.log(error);
		});
	
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Reactdex</h2>
        </div>
          <input type="text"placeholder="type the name of the pokemon"
          value={this.state.value}
          onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));


export default App;
