import {createStore, combineReducers} from 'redux';

import taskReducer from '../reducers/reducer';


export const ConfigureStore = () => {
   
    const store = createStore (
        combineReducers({
            task : taskReducer
        })
    );
    return store;
};

