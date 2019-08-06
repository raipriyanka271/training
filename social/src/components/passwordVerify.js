import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom'


class Passwordverification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            registerCheck: false,
            email: null,
            toChangePassword: false,
            otpCheck: false,
            emailValidate: false,
            statusValidate: false
        }
    }

    handleSubmitPassword = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3001/api/PasswordVerify/' + values.email)
                    .then(response => response.text())
                    .then(data => {
                        if (data === "inserted") {
                            this.setState({ isRedirect: true, email: values.email })
                        } else if (data ==="status-false") {
                            this.setState({ statusValidate: true, email: values.email })
                        }
                        else{
                            this.setState({ emailValidate: true})
                        }
                    })
            }
        })
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3001/api/passwordReset/' + values.email + '/' + values.otp)
                    .then(response => response.text())
                    .then(data => {
                        if (data === "no-otp") {
                            this.setState({
                                otpCheck: true
                            })
                        } else {
                            this.setState({
                                toChangePassword: true, email: values.email
                            }
                        )
                    }
                })
            }
        })
    }


    render() {

        if (this.state.toChangePassword === true) {
            return <Redirect to={{ pathname: '/changePassword', state: { email: this.state.email } }} />
        }
        if (this.state.statusValidate) {
            return <Redirect to={{ pathname: '/verification', state: { email: this.state.email } }} />
       }

        const { getFieldDecorator } = this.props.form;
        return (
            (this.state.isRedirect === false) ?
                <div className="maindiv">
                    <div class="dropdown">
                        <button className="dropbtn">
                            <Icon type="arrow-left" />
                        </button>
                        <div className="dropdown-content">
                            <a href="/login">Login</a>
                            <a href="/signup">signup</a>
                            <a href="/">Homepage</a>
                        </div>
                    </div>
                    <div className="otpDiv">
                        <h3 className="heading3">Forgot Password</h3>
                        <Form onSubmit={this.handleSubmit} className="otp-form">

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
                                <br></br>
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmitPassword}>
                                    Continue
                     </Button>
                            </Form.Item>
                            {(this.state.emailValidate) ?
                                <p className="alert">Email not registered!!</p> : null
                            }

                            
                            <br></br>

                            <hr></hr>
                            <br></br>
                            <Icon type="arrow-left" /> <a href="/login">login now!</a>
                            <br></br>

                        </Form></div> </div> : <div className="maindiv">
                    <div class="dropdown">
                        <button class="dropbtn">
                            <Icon type="arrow-left" />
                        </button>
                        <div class="dropdown-content">
                            <a href="/login">Login</a>
                            <a href="/signup">signup</a>
                            <a href="/">Homepage</a>
                        </div>
                    </div>
                    <div className="otpDiv">
                        <h3 className="heading2">Forgot Password??</h3>
                        <Form onSubmit={this.handleSubmit} className="otp-form">

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

                            <Form.Item>
                                {getFieldDecorator('otp', {
                                    rules: [{ required: true, message: 'Please enter OTP sent on your registered Email!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter OTP"
                                    />,
                                )}
                            </Form.Item>
                            {(this.state.otpCheck) ?
                                <p className="alert">OTP Is Not Correct</p> : null
                            }
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                Continue
                        </Button>
                            {(this.state.emailValidate) ?
                                <p className="alert">Email not registered!!</p> : null
                            }
                            {(this.state.otpCheck) ?
                                <p className="alert">OTP Is Not Correct</p> : null
                            }

                            <br></br>
                            <br></br>
                            <Icon type="arrow-left" /> <a href="/login">login now!</a>
                            <br></br>

                        </Form>
                    </div>
                </div>

        );

    }
}

export default Form.create()(Passwordverification);

