import React, { Component } from 'react';
import { Icon } from 'antd';
import './homepage.css';
import { Modal, Button } from 'antd';


class Singlepost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post !== this.props.post) {
            this.state = {
                like: false,
            }
        }
    }

    handleLike = () => {
        fetch('http://localhost:3001/api/hitLike/' + this.props.post.post_id + '/' + this.props.post.likes)
            .then(response => response.text())
            .then(data => {
                this.setState({
                    like: !this.state.like
                });
            })
    };

    render() {
        let timestamp = new Date(this.props.post.timestamp);
        let time = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds()
        var date = timestamp.toLocaleDateString('en-GB');
        return (
            <div>
                <div className="itemflex" >
                    <div className="containerInside">
                        <br></br>
                        <p className="detail">{this.props.post.name} {"has posted "}</p>
                        <p className="detail"><b>{this.props.post.content}</b></p>
                        <div><Icon type="clock-circle" />{" " + date + " " + time}<br></br>
                            <Icon className="iconheart" onClick={this.handleLike} type="heart" theme={this.state.like ? 'filled' : 'outlined'} />
                            {this.state.like === true ? (this.props.post.likes === 0) ? <p>You liked this post</p> : <p>You and {this.props.post.likes} liked it</p> : <p>{this.props.post.likes} liked it</p>}
                        </div>

                    </div>
                </div>

            </div>
        );
    }

}


export default Singlepost;
