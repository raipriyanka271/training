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

class Changepassword extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    newSignup: null,
    isRedirect: false,
    email: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        fetch('http://localhost:3001/api/changePassword/' + this.props.location.state.email + '/' + values.password)
          .then(response => response.json())
          .then(data => this.setState({ isRedirect: true, email: values.email }));
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
      return <Redirect to='/login' />
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

      <div className="changeDiv">
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="signupform">
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
          <Button type="primary" htmlType="submit" className="button">
            Submit
          </Button>

        </Form>
      </div>
    );
  }
}


export default Form.create()(Changepassword);