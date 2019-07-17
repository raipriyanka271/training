import  * as ActionTypes from "../actions/action-types";
import { func } from "prop-types";
const initialState = {
  users: [],
 
};
export function userReducer(state = initialState, action) {
  switch(action.type){
  case "SAVEDATA":
    //console.log(action.data);
    return {
        ...state,
       
        users: action.data
    }

default : return state;


  }
}
// export default userReducer;
