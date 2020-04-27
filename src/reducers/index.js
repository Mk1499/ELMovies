import { combineReducers } from 'redux';
import authReducer from './auth'; 
import movieReducer from './movieReducer'; 



export default combineReducers({
    auth: authReducer, 
    movies: movieReducer
})