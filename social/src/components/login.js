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
      usersValidation: false
    }
  }

  renderRedirect = () => {
    if (this.state.isRedirect) {
      return <Redirect to='/signup' />

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

              this.setState({ usersValidation: true })
            }
            else {

              this.setState({ isRedirect: true })
            }
          });
      };
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="maindiv">
        <div>
          {this.renderRedirect()}
        </div>
        <div className="logincontainer">
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
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="/passwordVerify">
                Forgot password
              </a>
              {(this.state.usersValidation) ?
                <p className="alert">Username and Password Does Not Match</p> : null
              }
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              New User? <a href="/signup">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);

