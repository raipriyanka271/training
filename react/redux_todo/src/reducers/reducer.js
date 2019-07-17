import  * as ActionTypes from "../actions/action-types";
const initialState = {
  tasks: [],
  filterComp:[],
  filtercompCheck: false
};
function taskReducer(state = initialState, action) {
  
      switch(action.type){
        case ActionTypes.ADD : return {...state,tasks:[action.payload,...state.tasks]}

        case ActionTypes.DELETE : 
          {const newlist = [...state.tasks];
          newlist.splice(action.payload,1);
          return{
          ...state,
          tasks: newlist
          }
        }
        case ActionTypes.UPDATE : 
     
          {const newlist = [...state.tasks];
            newlist.forEach((items, i) => {
            if (i === action.payload) {
              // newlist.push(items);
              newlist[i].status = "Completed";
            }
          
      });
          return{
          ...state,
          tasks: newlist
          }
        }
        case ActionTypes.PRIORITYSORT : 
     
        {const newlist = [...state.tasks];
          newlist.sort((a, b) => ((parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1))
          
          return{
            ...state,
            tasks: newlist
            }
      }
      case ActionTypes.EDITTASK : 
          // alert('cfghj');
         //console.log(action.values.name)
         //console.log(action.index)
        {const newlist = [...state.tasks];
       
          newlist.forEach((items, i) => {
            if (i === action.index) {
              // newlist.push(items);
              newlist[i] = action.payload
              //newlist[i].name = action.payload.name;
              //newlist[i].time = action.payload.values.time;
              //newlist[i].priority = action.payload.values.priority;
              // newlist[i].name = action.payload.values.name;
            }
          })
          console.log(newlist)
          return{
            ...state,
            tasks: newlist
            }
      
    }
      case ActionTypes.DATESORT : 
     
      {const newlist = [...state.tasks];
        newlist.sort((a, b) =>new Date(a.time) > new Date(b.time) ? 1 : -1)
        
        return{
          ...state,
          tasks: newlist
          }
    }
      case ActionTypes.FILTERCOMP : 
     
        {const newlist = [...state.tasks];
          const arr=newlist.filter(item => {
            return (item.status === "Completed")
          })
          
          return{
            ...state,
            filtercompCheck:true,
            filterComp: arr
            }
      
    }
    case ActionTypes.ALLDATA : 
   
      
      
      return{
        ...state,
        filtercompCheck:false,
       
      
      }
  

        
        default: return state;
      
    }
  }
    export default taskReducer;