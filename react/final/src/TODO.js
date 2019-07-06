import React, { Component } from 'react';
import './App.css';
import TodoForm from './TodoForm'

class TODO extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: [],
            newArr: [],
            check: true,
            Asc: true,
            TimeAsc: true

        };
        this.add = this.add.bind(this);
        this.completed = this.completed.bind(this);

        this.taskSortA = this.taskSortA.bind(this);
        this.taskSortB = this.taskSortB.bind(this);
        this.FilterComp = this.FilterComp.bind(this);
        this.FilterIncomp = this.FilterIncomp.bind(this);
        this.allData = this.allData.bind(this);
    }
    add(name, time, priority) {
    let time1 = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(new Date(Date.parse(time)));
        let newTask = {
            name: name,
            priority: priority,
            time: time1,
            status: "incomplete"

        };
        this.setState({
            task: [...this.state.task, newTask]

        });
    }

    completed(index) {

        let list = [];
        this.state.task.forEach((items, i) => {
            if (i === index) {
                list.push(items);
                list[index].status = "completed";
            } else
                list.push(items)
        });
        this.setState({
            task: list
        })


    };
    delete(index) {

        let list = [];
        this.state.task.forEach((items, i) => {
            if (i !== index)
                list.push(items);
        });
        this.setState({
            task: list
        })


    };

    FilterComp() {

        let items = [];
        const result = this.state.task.filter(item => {
            return (item.status === "completed")


        })
        this.setState({
            newArr: result,
            check: false
        })

    }
    FilterIncomp() {

        let items = [];
        const result = this.state.task.filter(item => {
            return (item.status === "incomplete")


        })
        this.setState({
            newArr: result,
            check: false
        })

    }
    taskSortA() {
        console.log("here")
        let arr = [];
        this.state.task.forEach((items) => {
            arr.push(items);
        }
        );


        arr.sort((a, b) => ((parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1))
        if (this.state.Asc == true) {
            arr.reverse()
        }
        this.setState({
            task: arr,
            Asc: !this.state.Asc
        })
    }
    taskSortB() {
        console.log("here")
        let arr = [];
        this.state.task.forEach((items) => {
            arr.push(items);
        }
        );


        arr.sort((a, b) => (new Date(a.time) > new Date(b.time) ? 1 : -1));
        if (this.state.TimeAsc == true) {
            arr.reverse()
        }
        this.setState({
            task: arr,
            TimeAsc: !this.state.TimeAsc
        })
    }
    allData() {
        this.setState({
            check: true
        })
    }
    render() {
        let data = [];
        if (this.state.check == true)
            data = this.state.task;
        else
            data = this.state.newArr;
        return (

            <div>

                <div className="mainform">
                    <p><b></b>{"ADD NEW TASK"}<b></b></p>


                    <TodoForm add={this.add} />
                </div>
                <div className="mainform">
                    <input className="button1" type="button" value="Show Completed Task" onClick={this.FilterComp} />
                    <input className="button1" type="button" value="Show Incompleted Task" onClick={this.FilterIncomp} />
                    <input className="button1" type="button" value="Show All Tasks" onClick={this.allData} />
                    {/* <input type="button" value="incomplete" onClick={this.incompleted} /> */}

                </div>


                <div className="LEFT">
                    <table className="table">
                        <tr>
                        {/* input type="button" value="Sort" onClick={this.taskSortB} /> */}
                        {/* <input type="button" value="Sort" onClick={this.taskSortA} /> */}
                            <th>Task</th>
                            <th>Time</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Done</th>
                            <th>Delete</th>
                        </tr>
                        {data.map((task, index) => {
                            return (<tr className={task.status == "completed" ? "comp" : "incomp"}>
                                <td>{task.name} </td>
                                <td>{task.time}</td>
                                <td>{task.priority} </td>
                                <td>{task.status}</td>
                                <td><input className="button" type="button" value="Done" onClick={() => this.completed(index)} /></td>
                                <td><input className="button" type="button" value="Delete" onClick={() => this.delete(index)} /></td>
                            </tr>)
                        })}
                    </table>
                </div>



            </div>

        )
    }
}
export default TODO;
