import React, { Component } from 'react';
import { Icon } from 'antd';
import './homepage.css';
import { Modal, Button } from 'antd';


class Singlepost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          like:false
        }
    }
    handleLike = () => {
        this.setState({
            like: !this.state.like,
        });
    };
   
    render() {
             
        return (
            <div> 
                <div className="itemflex" >
                     <div className="containerInside"> 
                     <br></br>
                        <p className="detail">{this.props.post.user_id} {"has posted "}</p>
                        <p className="detail"><b>{this.props.post.content}</b>{" at : "} {this.props.post.timestamp}</p> 
                        <Icon className="iconheart" onClick={this.handleLike} type="heart" theme={this.state.like ? 'filled' : 'outlined'} />
                    
                     </div> 
                </div>
               
            </div>
        );
    }

}


export default Singlepost;
