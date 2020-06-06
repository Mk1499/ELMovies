
import {LOGIN,SETUSERDATA,SETLOGINLOADING} from '../actions/types'; 


const INITIAL_STATE = { 
    log:"",
    userToken:"",
    loginLoading: false,
    userInfo:{}, 
    signUpLoading:false
 };

const auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          userToken:action.data.token
        }
        case SETLOGINLOADING:
        return {
          ...state,
          loginLoading:action.data
        }
        case SETUSERDATA:
          console.log("USer REdux : ",action.payload);
          
          return{
            ...state,
            userInfo:action.payload.user || action.payload
          }
      default:
        return state
    }
  }
  
  export default auth