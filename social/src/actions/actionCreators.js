import  * as ActionTypes from "../actions/action-types";

export const login = (values) => ({
    type: ActionTypes.LOGIN,
     payload : values
});

export const signup = (values) => ({
    type: ActionTypes.SIGNUP,
     payload : values
});




