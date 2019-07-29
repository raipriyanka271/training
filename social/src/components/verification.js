import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom'


class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            registerCheck: false
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
                    .then(response => response.json())
                    .then(data => this.setState({ isRedirect: true }));

            }
        });
    };

    render() {
        if (this.state.registerCheck === true) {
            return <Redirect to='/signup' />
        } else if (this.state.isRedirect === true) {
            return <Redirect to='/homepage' />
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="otpdiv">
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Continue
                     </Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Verification);

