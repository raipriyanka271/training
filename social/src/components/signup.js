import React, { Component } from 'react';
import moment from 'moment';

import './App.css';
import { Redirect } from 'react-router-dom'

import {
  Icon,
  Form,
  Input,
  Tooltip,
  Select,
  Button,
  AutoComplete,
  DatePicker
} from 'antd';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class Signup extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    newSignup: null,
    isRedirect: false,
    email: null,
    details: null
  };
  renderRedirect = () => {
    if (this.state.isRedirect) {
      return <Redirect to={{ pathname: '/verification', state: { email: this.state.email } }} />
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.dob = moment(values.dob).format('YYYY-MM-DD')
        fetch('http://localhost:3001/api/newuser'
        , {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values
          })
        }).then(response => response.text())
          .then(data => {
            if (data === "not-allowd") {
              this.setState({
                checkEmail: true,

              })
            } else {
              this.setState({
                isRedirect: true,
                email: values.email,
                details: values
              })
            }
          })
      }
    })
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    };

  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  checkCustomPassword= (rule, value, callback) => {
    const { form } = this.props;
    var regex = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])");
    if (!regex.test(value)) {
      callback(true);
    } else {
      callback();
    };
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={{ pathname: '/verification', state: { email: this.state.email } }} />
    }
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className="maindiv">
        <div class="dropdown">
          <button class="dropbtn">
            <Icon type="arrow-left" />
          </button>
          <div class="dropdown-content">
            <a href="/login">Login</a>
            {/* <a href="/signup">signup</a> */}
            <a href="/">Homepage</a>
          </div>
        </div>
        <div className="signup">
        <h3 className="heading2">Create New Account</h3>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="signupform">
           
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item
              label={
                <span>
                  First Name
              <Tooltip title="What do you want others to call you?">
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('first_name', {
                rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Last Name
              <Tooltip title="What do you want others to call you?">
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('last_name', {
                rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                  {
                    validator: this.checkCustomPassword,
                    message: 'Passwords must contain a uppercase , a lower case and Special character!',
                  },
                  {
                    min: 8,
                    message: 'Password must be 8 characters long!!',
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                  {
                    min: 8,
                    message: 'Password too small!!',
                  }


                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>


            <Form.Item label="Birthday">
              {getFieldDecorator('dob', {
              })(<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />)}
            </Form.Item>
            {(this.state.checkEmail) ?
              <p className="alert1">Email already Exists</p> : null
            }
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
          </Button>
              Already a User? <a href="/login">Login now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}


export default Form.create()(Signup);