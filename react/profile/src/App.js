import React, { Component } from 'react';
import './App.css';
import { Icon, Button } from 'antd';
import SingleUser from './SingleUserComponent';
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
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
    var myobj;
    var obj=[];
    const modifiedUsers = this.state.users.map((singleUser, index) => {
    myobj = {
        name: singleUser.name,
        email: singleUser.email,
        phone:singleUser.phone,
        website: singleUser.website,       
        address:singleUser.address.city+" "+singleUser.address.street+" "+singleUser.address.zipcode,
      };
      obj=[...obj,myobj]
      return (
        <div key={singleUser.id}>
          <SingleUser user={singleUser} delete={this.handleDelete} />
        </div>
      );
    });
    console.log(obj)
    return (
      <div>
        <div><ExcelFile element={<Button type="primary"><Icon type="download" /></Button>}>
          <ExcelSheet data={obj} name="userdata">
            <ExcelColumn label="Name" value="name" />
            <ExcelColumn label="email" value="email" />
            <ExcelColumn label="phone" value="phone" />
            <ExcelColumn label="website" value="website" />
            <ExcelColumn label="address" value="address" />
           
          </ExcelSheet>


        </ExcelFile>
        </div>
        <div className="main">
          <div className="container">
            {modifiedUsers}
          </div>
        </div>
      </div>
    )
  }
}
export default App;

