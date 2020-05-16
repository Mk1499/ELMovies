import { combineReducers } from 'redux';
import authReducer from './auth'; 
import movieReducer from './movieReducer'; 
import seriesReducer from './seriesReducer'; 




export default combineReducers({
    auth: authReducer, 
    movies: movieReducer,
    series: seriesReducer

})