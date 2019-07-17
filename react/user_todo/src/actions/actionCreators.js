import  * as ActionTypes from "../actions/action-types";



// export const deleteUser = (i) => ({
//     type: ActionTypes.DELETE,
//      payload: i
     
// });

export const Fetch_User= (users)=>{
    return {
        type: "FETCH_USER_SUCCESS",
        users: users
    }

}