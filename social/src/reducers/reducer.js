import  * as ActionTypes from "../actions/action-types";
const initialState = {
 user:{},
 islogin: false
};

var userData = {}
function Reducer(state = initialState, action) { 
      switch(action.type){   

      case ActionTypes.LOGIN : 
       
         
        default:
          state = {
            ...state
          };      
    }
    return state;
  }
    export default Reducer;