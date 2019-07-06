import React, { Component } from 'react';
import './App.css';
import Form from "./Form"

class App2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Formname: " ", Formage: " " };

        this.display = this.display.bind(this);

    }
    display(name, age) {
        this.setState({
            Formname: name,
            Formage: age
        });
    };


    render() {
        return ( 
        <div>
        <div className = "mainform" >

            <Form display = { this.display } />
            
            <div className="label">
            
             < br / >
                Name: < label > { this.state.Formname }  </label> 
                < br / >
                Age: < label > { this.state.Formage } </label> 
            </div>

                
            </div>    
        </div>

        );
    }
}
export default App2;