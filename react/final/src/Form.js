import React, { Component } from 'react';
import './app2.css';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        this.props.display(event.target.Name.value, event.target.Age.value);
        event.preventDefault();
    }
    render() {
        return ( 
        <div >
            
            
            <form onSubmit = { this.handleSubmit } >
            
           
            Name: < input className="forminput" id = "Name" type = "text"  / >
            <br/>
            <br />
            Age: < input className="forminput" id = "Age" type = "text"  />
            <br /> 
            <br />
            <input type = "submit" value = "Submit" / >
                
            </form>
            
            
         </div>
        );
    }
}
export default Form;