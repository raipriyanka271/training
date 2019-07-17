import React, { Component } from 'react';
// import './App.css';
import { connect } from 'react-redux';
import SingleUser from './SingleUserComponent';
import {Fetch_User} from '../actions/actionCreators';
const mapStateToProps = (state) => {
    
    return {
        user: state.users,
      
    }
};

const mapDispatchToProps = dispatch => ({

 
    // deleteUser: () => dispatch(deleteUser()),
   
    
   
});


 
class Main extends Component {
      constructor(props) {
        super(props);
        
        // this.handleDelete = this.handleDelete.bind(this);
      }
      
      componentDidMount() {
            //alert('retyh');
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                //console.log(res);   
                this.props.dispatch({type:'SAVEDATA' , data:res});
               
            })
        }
    
  handleDelete(id) {
    // let arr = [];
    // this.state.users.forEach((user) => {
    //   if (user.id !== id)
    //     arr.push(user)
    // })
    // this.setState({
    //   users: arr
    // })
    // this.props.dispatch.deleteUser();

  };
  render() {
    const modifiedUsers = this.props.user.map((singleUser, index) => {
      return (
        <div key={singleUser.id}>
          <SingleUser user={singleUser} delete={this.handleDelete} />
        </div>
      );
    });
    return (
      <div className="main">
        <div className="container">
          {console.log(this.props.user)}{modifiedUsers}
        </div>
      </div>
    )
  }
}
export default connect( mapStateToProps )(Main)

