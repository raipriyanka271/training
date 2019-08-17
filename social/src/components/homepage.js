import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Layout, Menu } from 'antd';
import React, { Component } from 'react';
import './homepage.css';
import Singlepost from './Singlepost';
import { Redirect } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            collapsed: false,
            posts: null,
            updated: false,
            showPosts:false,
            showFriends:false,
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    componentDidUpdate(prevProps, prevState) {
        console.log(prevState)
        fetch('http://localhost:3001/api/home',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('token')
                }
            }).then((response) => {
                response.json().then((result) => {
                    if (prevState.posts === this.state.posts) {
                        this.setState({
                            posts: result,

                        })
                    }
                })
            })
    }
    componentDidMount() {
        this.props.form.validateFields();
        fetch('http://localhost:3001/api/home',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('token')
                }
            })
            .then((response) => {
                if (response.status === 401) {
                    this.setState({ isRedirect: true })
                }
                else {
                    response.json().then((result) => {
                        this.setState({
                            posts: result
                        })
                    })
                }

            })

    }

    destroySession = () => {
        sessionStorage.removeItem('token');
        this.setState({
            isRedirect: true
        })
    }

    search = (value) => {
        console.log(value)
    }

    addPost = (event) => {
        event.preventDefault();      
        fetch('http://localhost:3001/api/addpost/' + event.target.elements.post.value,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('token')
                }
            })
            .then((response) => {
                if (response.status === 401) {
                    this.setState({ isRedirect: true })
                }
                else {
                  document.getElementById('form1').reset();
                    this.setState({
                        updated: true,

                    })

                }

            })

    }

   

    menuClicked = (key) =>{
        if(key.key==="4"){
            this.setState({
                showPosts:true
            })
        }else if(key.key==='3'){
            this.setState({
                showFriends:true,
                showPosts:false
            })
        }
         else{
            this.setState({
                showPosts:false,
                showFriends:false
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.isRedirect) {
            return <Redirect to={{ pathname: '/login' }} />
        }
        const postlist = (this.state.posts!==null) ?
      this.state.posts.reverse().map((singlePost, index) => {
        return (
          <div key={index}>
            <Singlepost post={singlePost} />
          </div>
        )
      }) :null
    
        return (

            <div >

                <div>
                    <Layout>
                        <Sider
                            style={{ position: 'fixed' }}
                            className="sider"
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                        >
                            <div className="logo" />
                            <div className="image"></div>
                            <p className="name">HI Priyanka !!</p>
                            <Button onClick={this.destroySession} style={{ color: 'white', background: 'black', border: 'black', opacity: 0.8, margin: 50 }}>Logout</Button>
                            <Menu className="sider1" mode="inline" >
                                <Menu.Item key="1" onClick={(key)=>{ this.menuClicked(key)}}>
                                    <Icon type="user" />
                                    <span className="nav-text">View Profile</span>
                                </Menu.Item>
            
                                <Menu.Item key="3" onClick={(key)=>{ this.menuClicked(key)}}>
                                    <Icon type="user" />
                                    <span className="nav-text">Friends</span>
                                </Menu.Item>
                                <Menu.Item key="4" onClick={(key)=>{ this.menuClicked(key)}}>
                                    <Icon type="user" />
                                    <span className="nav-text">Posts</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <div className="header">
                                <Search className="search"
                                    placeholder="search"
                                    onSearch={(value) => this.search(value)}

                                />
                               
                            </div>
                           
                            <div className="content">
                            {this.state.showPosts=== true ?
                           <div>
                                <div className="heading">Share a word with your friends..</div>
                                <br></br>
                                <div>
                                    <form onSubmit={this.addPost} id="form1">
                                        <input type="text" id="post" className="fname" name="firstname" placeholder="Write something.." />

                                        <input type="submit" value="Share Your Post" />
                                    </form>
                                </div>
                                <div className="container">
                                    <h3 className="heading1">Recents Posts</h3>
                                    {postlist}
                                </div>
                                </div>                          
                            :
                            <div><p className="heading">PROFILE HERE</p></div>}
                              {this.state.showFriends=== true ?
                              <div><p className="heading">Friend List</p></div>
                              :<div><p className="heading"></p></div>}
                            </div>

                        </Layout>
                    </Layout>,
                </div>,
            </div>
        );
    }
}
const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })
export default Form.create()(Homepage);

