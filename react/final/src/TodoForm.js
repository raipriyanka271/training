import React, { Component } from 'react';
 import './App.css';


class TodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        
        this.props.add(event.target.Name.value, event.target.Time.value,event.target.Priority.value,event.target.Status.value);
        event.preventDefault();
    }
    render() {
        return ( 
        <div >
            
            
            <form onSubmit = { this.handleSubmit } >
            
            < input id = "id" type = "hidden" />
           Task: < input id = "Name" type = "text"  />
            
            
            Time: < input id = "Time" type = "datetime-local"  /> 
            Priority: <input id = "Priority" type = "text" />
           
            <input id = "Status" type = "hidden" value="false" />
           
            <input type = "submit" value = "Add" />
                
            </form>
            
          
         </div>
        );
    }
}
export default TodoForm;