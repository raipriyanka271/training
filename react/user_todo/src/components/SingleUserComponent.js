
    
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Modal, Button } from 'antd';

class SingleUser extends Component {
    constructor(props) {
        super(props);
   
    }
    showModal = () => {
       
    };
    handleOk = () => {
       
    };
    handleCancel = () => {

        
    };
    handleLike = () => {
        
    };
    handleChange = (event) => {
        // const targetname = event.target.name;
        // const value = event.target.value;
        // this.setState({
        //     user: {...this.state.user,[targetname]:value }
        // });
    };
    render() {
        
            return (
                <div>
                    <div className="itemflex" >
                        <p className="imageflex"> <img src={"https://avatars.dicebear.com/v2/avataaars/" + this.props.user.username + ".svg?options[mood][]=happy "}></img> </p>
                        <p className="detail"><b>{this.props.user.name}</b> </p>
                        <p className="detail"><Icon type="mail" />{ this.props.user.email}</p>
                        <p className="detail"><Icon type="phone" />{this.props.user.phone} </p>
                        <p className="detail"><Icon type="global" />{this.props.user.website}</p>
                    </div>
                    <div className="iconContainer">
                        <Icon className="iconheart" onClick={this.handleLike} type="heart" />
                        {/* theme={this.state.like ? 'filled' : 'outlined' }  */}
                        <Icon className="iconItem" type="edit" onClick={this.showModal} ></Icon>
                        {/* <Icon className="iconItem" type="delete"  onClick={()=>this.props.delete(this.props.user.id)}  ></Icon> */}
                    </div>
                    <Modal
                        title="Edit Details"
                        // visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onOk={this.handleOk} >
                        <div >
                            <form className="mainform">
    
    
                                Name : < input className="formdiv" id="user_name" name="name" type="text" value={this.props.user.name} onChange={this.handleChange} />
                                <br></br>
    
    
                                Email : < input className="formdiv" id="email" name="email" type="text" value={this.props.user.email} onChange={this.handleChange}  />
    
    
                                <br></br>
                                Call  :   <input id="call " className="formdiv" type="text" name="phone" value={this.props.user.phone} onChange={this.handleChange}  />
    
    
                                <br></br>
                                Web : <input id="web" className="formdiv" type="text" name="website" value={this.props.user.website} onChange={this.handleChange}  />
    
                                <br></br>
    
    
    
                            </form>
                        </div>
    
                    </Modal>
                </div>
            );
        }
        
    }


export default SingleUser;
