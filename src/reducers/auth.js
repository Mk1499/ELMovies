
import {LOGIN,SETUSERDATA} from '../actions/types'; 


const INITIAL_STATE = { 
    log:"",
    userToken:"",
    loginLoading: false,
    userInfo:{
      email:""
    }
 };

const auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          userToken:action.data.token
        }
        case SETUSERDATA:
          console.log("USer REdux : ",action.payload);
          
          return{
            ...state,
            userInfo:action.payload.user
          }
      default:
        return state
    }
  }
  
  export default auth