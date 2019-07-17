
    
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Modal, Button } from 'antd';

class SingleUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            visible: false,
            like:false
        }
        this.showModal = this.showModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {
        this.setState({
            visible: false,
        });
    };
    handleCancel = () => {

        this.setState({
            visible: false,
        });
    };
    handleLike = () => {
        this.setState({
            like: !this.state.like,
        });
    };
    handleChange = (event) => {
        const targetname = event.target.name;
        const value = event.target.value;
        this.setState({
            user: {...this.state.user,[targetname]:value }
        });
    };
    render() {
        
        
            return (
                <div>
                    <div className="itemflex" >
                        <p className="imageflex"> <img src={"https://avatars.dicebear.com/v2/avataaars/" + this.state.user.username + ".svg?options[mood][]=happy "}></img> </p>
                        <p className="detail"><b>{this.state.user.name}</b> </p>
                        <p className="detail"><Icon type="mail" />{ this.state.user.email}</p>
                        <p className="detail"><Icon type="phone" />{this.state.user.phone} </p>
                        <p className="detail"><Icon type="global" />{this.state.user.website}</p>
                    </div>
                    <div className="iconContainer">
                        <Icon className="iconheart" onClick={this.handleLike} type="heart" theme={this.state.like ? 'filled' : 'outlined' } />
                        <Icon className="iconItem" type="edit" onClick={this.showModal} ></Icon>
                        <Icon className="iconItem" type="delete"  onClick={()=>this.props.delete(this.state.user.id)}  ></Icon>
                    </div>
                    <Modal
                        title="Edit Details"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onOk={this.handleOk} >
                        <div >
                            <form className="mainform">
    
    
                                Name : < input className="formdiv" id="user_name" name="name" type="text" value={this.state.user.name} onChange={this.handleChange} />
                                <br></br>
    
    
                                Email : < input className="formdiv" id="email" name="email" type="text" value={this.state.user.email} onChange={this.handleChange}  />
    
    
                                <br></br>
                                Call  :   <input id="call " className="formdiv" type="text" name="phone" value={this.state.user.phone} onChange={this.handleChange}  />
    
    
                                <br></br>
                                Web : <input id="web" className="formdiv" type="text" name="website" value={this.state.user.website} onChange={this.handleChange}  />
    
                                <br></br>
    
    
    
                            </form>
                        </div>
    
                    </Modal>
                </div>
            );
        }
        
    }


export default SingleUser;
