import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom'


class Landing extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let data = sessionStorage.getItem('token');
   if(data!==null){
    return <Redirect to='/homepage' />
   }
    return (<div className="maindiv">
      <div className="landingContainer">
        <div className="landingInside">
          <br></br>
          <div className="mainDiv">
           <p className="title" >Connect <Icon type="facebook" /></p> 
           <Icon type="user" />New User ?  <a href="/signup">register now!</a>
            <br></br>
            <br></br>
            <Icon type="user" /> Already a user ? <a href="/login">Login Here!</a>
          </div>
        </div>

      </div>
    </div>)
  }
}

export default Landing;