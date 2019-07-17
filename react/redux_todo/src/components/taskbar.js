import React,{Component} from 'react';
import './App.css';
import { Icon } from 'antd';
import { Modal, Button } from 'antd';
 class TaskBar extends Component{
  constructor(props){
    super(props);
    this.state = {   
      check: false,  
  };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlefiltercomp = this.handlefiltercomp.bind(this);
    this.allData=this.allData.bind(this);
}
  handleSubmit(event){
        
    const task = {
        name : event.target.name.value,
        time : event.target.datetime.value,
        priority : event.target.priority.value,
        status : "Incomplete"
    }
    this.props.addTask(task);
    event.preventDefault();
  //  event.target.reset();
}
handlefiltercomp(event){
  
  this.props.filtercomp();
}
allData(event){
  
  // this.props.showall();
}
  render(){

    return(
      <div className="container">
      <div className="content">
         <h1 className="title">TODO APPLICATION</h1> 
          <form  className="form-inline" onSubmit={this.handleSubmit}>
              NAME :<input type="text" name="name"
                  id="name" placeholder="Name" required/>
              TIME : <input type="datetime-local" name="datetime"
                  id="datetime" min={new Date()} required/>
              PRIORITY: <select name="priority" id="priority" required>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
              </select><br />
              <button className="button2" type="submit"><Icon className="icon" type="plus" /></button>
          </form>
          <div className="mainform">
                   <input  type="button" className="button1" value="Show Completed Task" onClick={this.handlefiltercomp} />
                   {/* <input  type="button" className="button1" value="Show All Task"  /> */}
                   
                    <input className="button1" type="button" value="Show All Tasks" onClick={this.allData} /> 
                   

              </div> 

      </div>
  </div>
    );
  }

  
}

export default TaskBar;