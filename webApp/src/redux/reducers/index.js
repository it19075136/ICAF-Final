import {combineReducers} from 'redux';
import documentReducer from './documentReducer';
import submissionReducer from './submissionReducer';
import workshopReducer from './workshopReducer';
import userReducer from './userReducer';

import adminReducer from './adminReducer';
import conferenceReducer from './conferenceReducer';
 

export default combineReducers({
    submission: submissionReducer,
    user:userReducer,
    workshop: workshopReducer,
    admin : adminReducer,
    conference: conferenceReducer,
    document: documentReducer

});