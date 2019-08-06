import React from 'react';
import './App.css';
import { login, signup } from '../actions/actionCreators';
import { connect } from 'react-redux';
import Login from './login.js';
import Homepage from './homepage';
import Signup from './signup.js';
import Verification from './verification.js';
import Passwordverification from './passwordVerify.js';
import Changepassword from './changePassword';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './landing';

class Main extends React.Component {

    render() {
        return (
           
              
                    <Router>
                        <Route path="/" exact component={Landing} />
                        {/* <Route exact path="/" render={props => <Login history={props.history} login={this.props.login} social={this.props.social} />} /> */}
                        <Route exact path="/login" render={props => <Login history={props.history} login={this.props.login} social={this.props.social} />} />
                        <Route exact path="/signup" render={props => <Signup signup={this.props.signup} />} />
                        <Route exact path="/verification" render={props => <Verification {...props} />} />
                        <Route exact path="/passwordVerify" render={props => <Passwordverification {...props} />} />
                        <Route exact path="/changePassword" render={props => <Changepassword {...props} />} />
                        <Route exact path="/homepage" render={props => <Homepage {...props} />} />
                    </Router>
              
           
        );
    }
}
const mapStateToProps = (state) => {
    return {
        social: state.social,
    }
};

const mapDispatchToProps = dispatch => ({
    login: (values) => dispatch(login(values)),
    signup: (values) => dispatch(signup(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)