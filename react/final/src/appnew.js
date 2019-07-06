import React, { Component } from 'react';

class Form1 extends Component{

constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
}


handleSubmit(event){
    this.props.display(event.target.Name.value,event.target.Age.value);
    event.preventDefault();
  }



render(){
    return(
     <form onSubmit={this.handleSubmit}>
                Name:<input id="Name" type="text"/>
                <br />
                Age:<input id="Age" type="text"/>
                <br/>
                <input type="submit"></input>
              </form>
    );
}
}
export default Form1;