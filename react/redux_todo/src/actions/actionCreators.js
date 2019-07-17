import  * as ActionTypes from "../actions/action-types";

export const addTask = (task) => ({
    type: ActionTypes.ADD,
    payload: task
});

export const deleteTask = (i) => ({
    type: ActionTypes.DELETE,
     payload: i
     
});
export const updateTask = (i) => ({
    type: ActionTypes.UPDATE,
     payload: i
     
});
export const showall = () => ({
    type: ActionTypes.ALLDATA,

     
});
export const editTask = (index,values) => ({
    type: ActionTypes.EDITTASK,
    //payload: {index,values}
     index : index,
     payload : values
});
export const filtercomp = () => ({
    type: ActionTypes.FILTERCOMP,
    
     
});
export const prioritySort = () => ({
    type: ActionTypes.PRIORITYSORT
    
     
});
export const dateSort = () => ({
    type: ActionTypes.DATESORT
    
     
});

