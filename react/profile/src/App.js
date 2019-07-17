import React, { Component } from 'react';
import './App.css';
import SingleUser from './SingleUserComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],

    }
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
  }
  handleDelete(id) {
    let arr = [];
    this.state.users.forEach((user) => {
      if (user.id !== id)
        arr.push(user)
    })
    this.setState({
      users: arr
    })
  };
  render() {
    const modifiedUsers = this.state.users.map((singleUser, index) => {
      return (
        <div key={singleUser.id}>
          <SingleUser user={singleUser} delete={this.handleDelete} />
        </div>
      );
    });
    return (
      <div className="main">
        <div className="container">
          {modifiedUsers}
        </div>
      </div>
    )
  }
}
export default App;

