import { combineReducers } from 'redux';
import authReducer from './auth'; 
import movieReducer from './movieReducer'; 
import seriesReducer from './seriesReducer'; 
import actorReducer from './actorReducer'; 
import wlReducer from './wlReducer';



export default combineReducers({
    auth: authReducer, 
    movies: movieReducer,
    series: seriesReducer, 
    actors: actorReducer,
    wlist: wlReducer
})