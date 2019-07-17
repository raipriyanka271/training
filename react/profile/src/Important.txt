
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Modal, Button } from 'antd';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      visible: false,
      current : null,
      likes: false
    }
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.like = this.like.bind(this);

  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({ users: data }));

  }
  showModal = (index) => {
    this.setState({
      visible: true,
      current:index
    });
  };

  edit(name,email) {
    this.setState({
      visible: false,
    });
    


  }
  handleOk = (e) => {
    console.log(e.target.elements)
    // this.edit(e.target.element.Name.value,e.target.element.email.values);
    this.setState({
      visible: false,
    });
    
    
    };
   setnameState = (event) => {
    //  let users = [...this.state.users];
    //  let x = users[this.state.current].name;
    //  x += event.target.value;
    //  users.splice(this.state.current,1,x);
    //  this.setState({users : users});
     
    // // this.setState({

    // //   users : event.target.value});
    // console.log(this.state.users);
    // console.log(this.state.current);
    this.setState({
     // visible:false
    })
    

    };
    setemailState = (event) => {
      
     
 
     };
     setcallState = (event) => {
   
     
 
     };
     setwebState = (event) => {
    
     
 
     };
    
    

  handleCancel = () => {
    
    this.setState({
      visible: false,
    });
  };

  delete(index) {
    let newArr = [];
    this.state.users.forEach((value, i) => {
      if (index !== i) {
        newArr.push(value);
      }

    });
    console.log(newArr)
    this.setState({
      users: newArr
    })
  }
  like() {
  this.setState({
    likes:true
  })
    
  }

  render() {
    let user = this.state.users;
    return (
      <div className="main">
        <div className="container">
          {this.state.users.map((item, index) => {
            return (<div><div className="itemflex" >
              <p className="imageflex"> <img src={"https://avatars.dicebear.com/v2/avataaars/" + item.username + ".svg?options[mood][]=happy "}></img> </p>

              <p className="detail"><b>{item.name}</b> </p>
              <p className="detail"><Icon type="mail" />{item.email}</p>
          
              <p className="detail"><Icon type="phone" />{item.phone} </p>
              <p className="detail"><Icon type="global" />{item.website}</p>
            </div>
              <div className="iconContainer">
            
                 <Icon className="iconheart" onClick={this.like} type="heart"  theme={this.state.likes ? 'filled' : 'outlined' }/>
                 <Icon className="iconitem" onClick={this.showModal} type="edit"  ></Icon>
                  <Icon className="iconitem" onClick={this.delete} type="delete"  ></Icon>


              </div>
            </div>

            )
          })};
          <Modal
                  title="Edit Details"
                  visible={this.state.visible}
                 
                  onCancel={this.handleCancel}
                  onOk={this.handleOk}
                  >
                  <div >

                   
                    <form className="mainform" onSubmit="handleSubmit()">


                      Name : < input className="formdiv" id="user_name" type="text" value=
                      {this.state.users[this.state.current]==null?"":this.state.users[this.state.current].name} onChange={(e)=> {
                        let ar = this.state.users;
                        let index = this.state.current;
                        ar[index].name = e.target.value;
                        this.setState({users: ar})}} />
                      <br></br>
                      

                       Email : < input className="formdiv" id="email" type="text" value=
                      {this.state.users[this.state.current]==null?"":this.state.users[this.state.current].email} onChange={(e)=>{
                        let ar=this.state.users;
                        let index=this.state.current;
                        ar[index].email=e.target.value;
                        this.setState({users:ar})}}/>
                   
                     
                      <br></br>
                      Call : <input id="call" className="formdiv"  type="text" value=
                      {this.state.users[this.state.current]==null?"":this.state.users[this.state.current].phone} onChange={(e)=>{
                        let ar=this.state.users;
                        let index=this.state.current;
                        ar[index].phone=e.target.value;
                        this.setState({users:ar})}}/>
                  
                      
                      <br></br>
                      Website : <input id="web" className="formdiv"  type="text" value=
                      {this.state.users[this.state.current]==null?"":this.state.users[this.state.current].website} onChange={(e)=>{
                        let ar=this.state.users;
                        let index=this.state.current;
                        ar[index].website=e.target.value;
                        this.setState({users:ar})
                      }}/>
                      
                      <br></br>
              
       

                    </form>
                  </div>

                </Modal>
        </div>
      </div>
    )


  }
}
export default App;


