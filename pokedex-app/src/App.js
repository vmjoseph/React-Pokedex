import React, { Component } from 'react';
import './App.css';
import Modal from 'react-modal';

class App extends Component {
	constructor(props) {
    super(props);
       this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    this.state = {
      value: '',
      data: {}, //filled by fetch data from API
      imgData: {}, //filled by fetch image data from API
      typeData: {}, //filled by fetch types data from API
      types: {typesArray:[]},
      typeDataTotal: {},
      specificTypeData: {}
    };	
  }
  
 openModal () { this.setState({open: true}); }

    closeModal () { this.setState({open: false}); }

  

   handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
	  
    //alert('Text field value is: ' + this.state.value);
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
               _this.setState({typeData: data.types[0].type});	
               _this.setState({specificTypeData: data.types});	  
               _this.setState({typeDataTotal: Object.keys(data.types)});
			//	console.log(data.types[0].type.name);
				//console.log(data.types[1].type.name);
				console.log(Object.keys(data.types).length);
 

			  });  
			} 
		  )  
		  .catch(function(err) {  
			console.log('Fetch Error :-S', err);  
            _this.setState({data: {}});
			_this.setState({imgData: {}});
			_this.setState({typeData: {}});
            _this.setState({typeDataTotal: {}});
            _this.setState({specificTypeData: {}});
		  });

		  }



    
  render() {
	  
	  var data = this.state.data;
	  var imgData= this.state.imgData;
	  var typeData= this.state.typeData;
	  var typeDataTotal= this.state.typeDataTotal;  
	  var specificTypeData= this.state.specificTypeData;  
	  var forms = [];
/*for(var i= 0; i>typeDataTotal.length; i++){
console.log("logged one type.");
}
for (var i = 0; i > typeDataTotal.length; i++) {
    forms.push(<formjs data={specificTypeData[i].type.name} />);
console.log(forms);
}
* 
*  <h3>ID: {data.id}</h3> */
for (var keys in typeDataTotal) {
  console.log("obj." + keys + " = " + specificTypeData[keys].type.name);
    forms.push(<formjs key={specificTypeData[keys]} data={specificTypeData[keys].type.name} />);
    console.log(forms);
}

    return (
    

    
      <div className="App">

      <div className="App-topHeader">
      <h3>Welcome to the ReactJS Pokedex!</h3>
      <p class="small"><i>Enter the name of the pokemon to find out the deails below:</i></p>
      </div>
        <div className="App-header">
      <img src={imgData.front_default} alt={data.name}/>
      <img src={imgData.back_default} alt={data.name}/>
      <div class="infoBoxes">
		  <h3>Name: {data.name}</h3>
		  <h3>Weight: {data.weight}</h3>
		  <h3>Type Name: {typeData.name}</h3>
		  <h3>Type Total: {typeDataTotal.length}</h3>
		   <div>{forms}</div>
      <a href="#"  onClick={this.openModal}>More Info</a>
       </div>
        </div>
        
        <input type="text"
        placeholder="enter name of pokemon here"
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        />
        <button type="button" onClick={this.handleSubmit.bind(this)}>Search the Pokedex</button>
 
           <Modal isOpen={this.state.open}>
      <img src={imgData.front_default} alt={data.name}/>
      <img src={imgData.back_default} alt={data.name}/>
      <img src={imgData.front_shiny} alt={data.name}/>
      <img src={imgData.back_shiny} alt={data.name}/>
            <h1>Name: {data.name}</h1>
            <h3>Weight: {data.weight}</h3>
            <h3>Height: {data.height}</h3>
            <h3>Pokedex Index: {data.id}</h3>
            <h3>Base Experience: {data.base_experience}</h3>
            <button onClick={this.closeModal}>Close</button>
          </Modal>
 
      </div>
      
      
    );
   
  }
}
export default App;
