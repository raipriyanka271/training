import React,{Component} from 'react';
 class Add extends Component{
  render(){

    return(
    <div>
    <input type="text" ref="task" />
    <button>Add Task</button>
    </div>
    );
  }

  
}

export default Add;