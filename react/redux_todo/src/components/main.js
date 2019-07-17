import React, { Component } from 'react';

import './App.css';
import {editTask,showall,addTask,deleteTask,updateTask,prioritySort,filtercomp,dateSort} from '../actions/actionCreators';



import { connect } from 'react-redux';

import TaskBar from './taskbar.js';
import TaskList from './tasklist';
const mapStateToProps = (state) => {
    console.log(state);
    return {
        tasks: state.task,
      
    }
};

const mapDispatchToProps = dispatch => ({

    addTask: (task) => dispatch(addTask(task)),
    deleteTask: (i) => dispatch(deleteTask(i)),
    updateTask: (i) => dispatch(updateTask(i)),
    prioritySort: () => dispatch(prioritySort()),
    filtercomp: () => dispatch(filtercomp()),
    dateSort:()=>dispatch((dateSort())),
    showall:()=>dispatch((dateSort())),
    editTask:(index,values)=>dispatch(editTask(index,values)),
   
});

 class Main extends Component{
    
     render(){
         return (
             <div className="maindiv">
             {console.table(["JavaScript","React","Redux"])}
             
             <TaskBar addTask = {this.props.addTask} filtercomp={this.props.filtercomp}  showall={this.props.showall}/>
             {/* <TaskList tasks={this.props.tasks.tasks}/> */}
             <TaskList tasks={this.props.tasks.tasks} 
                    deleteTask = {this.props.deleteTask} 
                    updateTask = {this.props.updateTask} 
                    filtercomp={this.props.tasks.filterComp}
                    filtercompCheck={this.props.tasks.filtercompCheck} 
                    prioritySort = {this.props.prioritySort}
                    dateSort={this.props.dateSort} 
                    editTask={this.props.editTask}
                     />

             </div>
         );

     }
 }
 export default connect( mapStateToProps, mapDispatchToProps )(Main)