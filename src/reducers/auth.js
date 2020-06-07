import { LOGIN, SETUSERDATA, SETLOGINLOADING, LOADING } from "../actions/types";

const INITIAL_STATE = {
  log: "",
  userToken: "",
  loginLoading: false,
  userInfo: {},
  signUpLoading: false,
  loading: false
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userToken: action.data.token
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SETUSERDATA:
      console.log("USer REdux : ", action.payload);

      return {
        ...state,
        userInfo: action.payload.user || action.payload,
        loading:false 
      };
    default:
      return state;
  }
};

export default auth;
