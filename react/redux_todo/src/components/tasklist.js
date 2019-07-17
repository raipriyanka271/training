import React from 'react';
import './App.css';
import { Icon } from 'antd';
// import { Modal, Button } from 'antd';
import { Button, Modal, Form, Input, Radio, InputNumber, DatePicker } from 'antd';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.handledelete = this.handledelete.bind(this);
        this.handleupdate = this.handleupdate.bind(this);
        this.handlesort = this.handlesort.bind(this);
        this.handledatesort = this.handledatesort.bind(this);
        this.state = {
           

                idx:"",

                editClicked: false
        }
    
           

    }
    handledatesort() {
        this.props.dateSort();
    }

    handledelete(event, i) {


        this.props.deleteTask(i);
        // event.preventDefault();

    }
    handleupdate(event, i) {
       this.props.updateTask(i);
    }
    handlesort() {
         this.props.prioritySort();
    }

    showModal(i){
        // console.log(i);
        this.setState({
            idx:parseInt(i),
            editClicked: true

        });
        // console.log(this.state.idx);

    }


    handleEditReset = () => {

        this.props.form.resetFields();

    };


    closeEditModal = () => {

        this.setState({

            editClicked: false,

        });

    };
    Edit = () => {

        

        const index=this.state.idx;
        this.props.form.validateFields((err,values)=>{

            if(!err){
                console.log(values);
                this.props.editTask(index,values)
            }
        })
        this.setState({

            editClicked: false,

        });


    };




    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = this.props.form;

        // var taskShow;
        //    this.props.filtercompCheck==="true" ?
        //    console.log(filterComp)
        //     taskShow = this.props.filterComp.map((task, i) => {
        //         return (
        //             <tr className="comp" key={i}>
        //                 <td>{task.name}</td>
        //                 <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: "2-digit" }).format(new Date(Date.parse(task.time)))}</td>
        //                 <td>{task.priority}</td>
        //                 <td>{task.status}</td>
        //                  <td><Icon className="iconItem" type="caret-down" onClick={(e) => this.handleupdate(e, i)}></Icon></td>
        //                 <td><Icon className="iconItem" type="close" onClick={(e) => this.handledelete(e, i)}></Icon></td>  
        //                 <td><Icon className="iconItem" type="edit" onClick={(e) => this.handleedit(e, i)}></Icon></td>  
        //             </tr>
        //         );
        //     })

        // :

        console.log("this.props ====>>>", this.props);

        let newArray = this.props.filtercompCheck ? this.props.filtercomp : this.props.tasks;
        var taskShow = newArray.map((task, i) => {
            return (
               
                    <tr className={task.status == "Completed" ? "comp" : "incomp"} key={i}>
                        <td>{task.name}</td>
                        <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: "2-digit" }).format(new Date(Date.parse(task.time)))}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                        <td><Icon className="iconItem" type="check" onClick={(e) => this.handleupdate(e, i)}></Icon></td>
                        <td><Icon className="iconItem" type="close" onClick={(e) => this.handledelete(e, i)}></Icon></td>
                        <td><Icon className="iconItem" type="edit" onClick={(e) => this.showModal(i)}></Icon></td>
                    </tr>

                    
            )
        })
        // if(this.props.filtercompCheck==="true") {
        // //   console.log(this.props.filtercomp)
        //     taskShow = this.props.filtercomp.map((task, i) => {
        //         return (
        //             <tr className="comp" key={i}>
        //                 <td>{task.name}</td>
        //                 <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: "2-digit" }).format(new Date(Date.parse(task.time)))}</td>
        //                 <td>{task.priority}</td>
        //                 <td>{task.status}</td>
        //                  <td><Icon className="iconItem" type="caret-down" onClick={(e) => this.handleupdate(e, i)}></Icon></td>
        //                 <td><Icon className="iconItem" type="close" onClick={(e) => this.handledelete(e, i)}></Icon></td>  
        //                 <td><Icon className="iconItem" type="edit" onClick={(e) => this.handleedit(e, i)}></Icon></td>  
        //             </tr>
        //         );
        //     })
        // }



        return (
            <div className="LEFT">
                <table className="table">
                    <thead>
                        <tr key={"heading"} >
                            <th>Task</th>
                            <th>Date & Time <Icon className="iconItem" type="arrow-down" onClick={this.handledatesort} ></Icon></th>
                            <th>Priority <Icon className="iconItem" type="arrow-down" onClick={this.handlesort} ></Icon></th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>

                    </thead>
                    <tbody>
                        {taskShow}
                    </tbody>
                </table>
                <div>
                   { this.state.idx!==""? 
                <Modal

className="Modal"

onCancel={this.closeEditModal}


visible={this.state.editClicked}

title="Edit Details"

footer={[

    <Button key="reset" onClick={this.handleEditReset}>

        Reset

    </Button>,

    <Button

        key="submit"

        type="primary"

        onClick={this.Edit}>

        Submit

    </Button>,

]}>

<Form >

    <br />


    <Form.Item label="Name">

        {getFieldDecorator('name', {

            initialValue:this.props.tasks[this.state.idx].name,
                       
            rules: [{ required: true }]

        })(<Input />)}

    </Form.Item>

    <br />


    <Form.Item label="Priority:">

        {getFieldDecorator('priority', {

            initialValue: this.props.tasks[this.state.idx].priority,

            rules: [

                {

                    required: true

                },

            ],

        })(<InputNumber />)}

    </Form.Item>
    <br />
    <Form.Item label="Time">
        {getFieldDecorator('time')(
            <DatePicker
            showTime
              format="YYYY-MMMM-DD HH:mm:ss" />
        )}
    </Form.Item>

    <br />

</Form>

</Modal>
: null}

                </div>
            </div>

        )


    }
}

export default Form.create()(TaskList);


