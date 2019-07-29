import {createStore, combineReducers} from 'redux';

import Reducer from '../reducers/reducer';


export const ConfigureStore = () => {
   
    const store = createStore (
        combineReducers({
            social : Reducer
        })
    );
    return store;
};

