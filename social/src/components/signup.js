import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import { Redirect } from 'react-router-dom'

import {
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
    email: null
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
        fetch('http://localhost:3001/api/newuser', {
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
                email: values.email
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
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '91',
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    return (

      <div className="signup">
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
          {(this.state.checkEmail) ?
            <p className="alert">Email already Exists</p> : null
          }
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
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Name
              <Tooltip title="What do you want others to call you?">
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Birthday">
            {getFieldDecorator('dob', {
            })(<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />)}
          </Form.Item>

          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}


export default Form.create()(Signup);