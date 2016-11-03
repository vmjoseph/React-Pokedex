import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: {} //filled by fetch data from API
    };
  }
  

   handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Text field value is: ' + this.state.value);
     var _this = this;
		fetch('https://pokeapi.co/api/v2/pokemon/'+this.state.value+'/')  
		  .then(  
			function(response) {  
			  if (response.status !== 200) {  
				console.log('Looks like there was a problem. Status Code: ' +  
				  response.status);  
				return;  
			  }
			  // Examine the text in the response  
			  response.json().then(function(data) {  
				console.log(data.name +" "+ data.id);
                _this.setState({data: data});

			  });  
			} 
		  )  
		  .catch(function(err) {  
			console.log('Fetch Error :-S', err);  
            _this.setState({data: {}});
		  });

		  }


  render() {
	  
	  var data = this.state.data;
	  
    return (
    
    
    
      <div className="App">
      
      
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        
        <input type="text"
        placeholder="enter name of pokemon here"
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        />
        <button type="button" onClick={this.handleSubmit.bind(this)}>Search the Pokedex</button>
      <h3>{data.id}</h3>       
      <h3>{data.name}</h3>
        
      </div>
      
      
      
    );
   
  }
}
export default App;
