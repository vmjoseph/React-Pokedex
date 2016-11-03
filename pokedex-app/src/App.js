import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: {}, //filled by fetch data from API
      imgData: {} //filled by fetch image data from API
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
				console.log(data);
				console.log(data.sprites.front_default);
                _this.setState({data: data});
               _this.setState({imgData: data.sprites});

			  });  
			} 
		  )  
		  .catch(function(err) {  
			console.log('Fetch Error :-S', err);  
            _this.setState({data: {}});
			_this.setState({imgData: {}});
		  });

		  }


  render() {
	  
	  var data = this.state.data;
	  var imgData= this.state.imgData;
	  
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
      <h3>ID: {data.id}</h3>       
      <h3>Name: {data.name}</h3>
      <h3>Weight: {data.weight}</h3>
      <img src={imgData.front_default}/>
   
      </div>
      
      
      
    );
   
  }
}
export default App;
