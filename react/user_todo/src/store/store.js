import { combineReducers, createStore } from 'redux';
import {userReducer} from '../reducers/reducer';

   
export const store = createStore (
        // combineReducers({
        //     user : userReducer
        // })
        userReducer
    );