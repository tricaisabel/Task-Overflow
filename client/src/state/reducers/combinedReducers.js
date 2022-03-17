import {combineReducers} from 'redux';
import userReducer from './userReducer';
import userProjectsReducer from './userProjectsReducer';
import projectReducer from './projectReducer';

const reducers=combineReducers({
    user:userReducer,
    userProjects:userProjectsReducer,
    project:projectReducer
})

export default reducers;