
import React, { Component } from 'react';

class form1 extends Component{
  constructor(props){
      super(props)
      this.state={
          name:"",
          age:""
      }
      this.display=this.display.bind(this);
    //   this.handleSubmit=this.handleSubmit.bind(this);
  }
  
  display(name1,age1){
      this.setState({
        name:name1,
        age:age1

      });
  }
  render(){
      return(
          <div>
             <Appnew display={this.display} />
              <br/>
              <label>NAME:{this.state.name}</label>
              <br></br>
              <label>Age:{this.state.age}</label>
          </div>
      );
  }

}
export default form1;