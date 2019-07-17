
    
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Modal, Button } from 'antd';

class SingleReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: this.props.reports,
            visible: false,
            
        }
        
    }

    render() {
        console.log("child");
        console.log(this.props.reports);
            return (
                // 
                <div>
                    <div className="itemflex" >
                        <p className="imageflex"> <img src={"https://via.placeholder.com/200/24f355"}></img> </p>
                        <p className="detail"><b>{this.state.report.title}</b> </p>
                        <p className="detail">{this.state.report.description}</p>
                        <p className="detail">{this.state.report.publishDate} </p>
                        <p className="detail">{this.state.report.cost}</p>
                    </div>
                    
                     {/* <Modal
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
    
                    </Modal> */}
                </div>
            );
        }
        
    }


export default SingleReport;
