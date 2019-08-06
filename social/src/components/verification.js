import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom'


class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            registerCheck: false,
            validationOtp: false
        }
    }

    componentDidMount() {
        if (this.props.location.state === undefined) {
            this.setState({
                registerCheck: true,
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3001/api/verify/' + values.otp + '/' + this.props.location.state.email)
                    .then(response => response.text())
                    .then(data => {
                        if (data === "no-otp") {
                            this.setState({
                                validationOtp: true
                            })
                        } else {
                            this.setState({ isRedirect: true })
                        }
                    })
            }
        })
    }

    render() {
        if (this.state.registerCheck === true) {
            return <Redirect to='/signup' />
        } else if (this.state.isRedirect === true) {
            return <Redirect to='/homepage' />
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="maindiv">
               
                <div className="otpdiv">
                    <p className="heading2">Varify your Email</p>
                    <Form onSubmit={this.handleSubmit} className="otp-form">
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
                        {(this.state.validationOtp) ?
                            <p className="alert">OTP Does Not Match</p> : null
                        }

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Continue
                     </Button>
                        <br></br>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <Icon type="arrow-left" /> <a href="/">Go back!</a>
                        <br></br>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Verification);

