import React, {Component} from 'react';
// import React from 'react';

import './App.css';

class App extends Component{
 
  constructor(props){
      super(props)
      this.state={
          num: 0
      }
      this.sum = this.sum.bind(this);
      this.minus = this.minus.bind(this);
  }
  sum(){

    this.setState({num:this.state.num+1});
  }
 minus(){

   this.setState({num:this.state.num-1});
 }

 render(){
  
  return (
    <div className="App">
      {(this.state.num>=10||this.state.num <= 0) ?
      (this.state.num>=10) ?
      <button onClick={this.minus}>-</button>:
      <button onClick={this.sum}>+</button>:
      <p> <button onClick={this.sum}>+</button>
      <button onClick={this.minus}>-</button></p>}
      <p>{this.state.num}</p>
    </div>
  );
}
}


export default App;
