import React, { Component } from 'react';


class EditForm extends React.Component {
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
            
        <form>
 


Name : < input id="Name" type="text" value=
  {this.state.users[this.state.current]==null?"":this.state.users[this.state.current].name} />
<br></br>
<br></br>

Email : < input id="email" type="text" value=
{this.state.users[this.state.current]==null?"":this.state.users[this.state.current].email} />
<br></br>
<br></br>
Call : <input id="call" type="text" value=
{this.state.users[this.state.current]==null?"":this.state.users[this.state.current].phone} />
<br></br>
<br></br>
Website : <input id="web" type="text" value=
{this.state.users[this.state.current]==null?"":this.state.users[this.state.current].website} />
<br></br>
<br></br>

         </div>
        );
  }
}


export default EditForm;