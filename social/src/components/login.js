import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      isRedirect: false,
      usersValidation: false,
      emailValidate: false,
      statusValidate: false,
      token: null
    }
  }

  renderRedirect = () => {
    if (this.state.isRedirect) {
      return <Redirect to='/homepage' />

    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('http://localhost:3001/api/search/' + values.username + '/' + values.password)
          .then(response => response.text())
          .then(data => {
            if (data === "no-user") {
              this.setState({
                usersValidation: true,
                emailValidate: false,
                statusValidate: false,
              })
            }
            else if (data === "not-allowd") {
              this.setState({
                emailValidate: true,
                usersValidation: false,
                statusValidate: false,
              })
            }
            else if (data === "status-false") {
              this.setState({ statusValidate: true, email: values.username })
            }
            else {
              
              this.setState({ email: values.username, token: data, isRedirect: true })
            }
          });
      };
    });
  };

  render() {

    if(this.state.token!=null){
    sessionStorage.setItem('token', this.state.token);
    }
    let data = sessionStorage.getItem('token');
    if(data!==null){
     return <Redirect to='/homepage' />
    }
    
    if (this.state.statusValidate) {
      return <Redirect to={{ pathname: '/verification', state: { email: this.state.email } }} />
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="maindiv">
          <div class="dropdown">
            <button class="dropbtn">
              <Icon type="arrow-left" />
            </button>
            <div class="dropdown-content">
              <a href="/signup">signup</a>
              <a href="/">Homepage</a>
            </div>
          </div>
          <div>
            {this.renderRedirect()}
          </div>
          <div className="logincontainer">
          <h3 className="heading2">Login Here</h3>
            <Form onSubmit={this.handleSubmit} className="login-form">
              
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              {(this.state.emailValidate) ?
                <p className="alert">Email not registered!!</p> : null
              }
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <a
                  href="/passwordVerify">
                  Forgot password
              </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
              </Button>
                {(this.state.usersValidation) ?
                  <p className="alert">Username and Password Does Not Match</p> : null
                }
                New User? <a href="/signup">register now!</a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);

