import {combineReducers} from 'redux';
import userReducer from './userReducer';
import projectReducer from './userProjectReducer';

const reducers=combineReducers({
    user:userReducer,
    projects:projectReducer
})

export default reducers;