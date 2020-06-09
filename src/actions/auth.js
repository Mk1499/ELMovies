import { WEB_CLIENT_ID } from "../configs/keys";
import { SETUSERDATA,LOADING } from "./types";
import Navigation from "../routes/NavigationServices";
import { customBaseUrl } from "../configs/global";
import {AsyncStorage} from 'react-native'; 
import { RNToasty } from 'react-native-toasty'


import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-community/google-signin";

export const googleLogin = () => async dispatch => {
  console.log("ID : ", WEB_CLIENT_ID);
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    Navigation.navigate("Home");
    dispatch({
      type: SETUSERDATA,
      payload: userInfo
    });
    await AsyncStorage.setItem("MLuserInfo", JSON.stringify(userInfo.user))
    console.log("User Info : ", userInfo);
  } catch (error) {
    console.log("error : ", error.code);
    console.log("Res : ", error.resolution);

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log("Sign in Cancled");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log("in progress");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log("play services not available");
    } else {
      // some other error happened
      console.log("other error: ", error.toString());
    }
  }
};

export const googleLogout = () => async dispatch =>  {
  console.log("logging out ..");
  
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // this.setState({ user: null }); // Remember to remove the user from your app's state as well
      dispatch({
        type: SETUSERDATA,
        payload: {}
      });
      await AsyncStorage.setItem("MLuserInfo","")
  } catch (error) {
    console.error("Google Logout Error : ", error);
  }
};

export const signIn = msg => async dispatch => {
  console.log("msg : ", msg);

  await fetch(`${customBaseUrl}/users/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(msg)
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        // alert(res.error);
        RNToasty.Error({title:res.error});

        throw res.error; 
      } else {
        console.log("login Success : ", res);
        AsyncStorage.setItem("MLuserInfo", JSON.stringify(res)); 
        dispatch({
          type: SETUSERDATA,
          payload: res
        });
        Navigation.navigate("Home");
      }
    })

    .catch(err => {
      dispatch({
        type: LOADING,
        payload: false
      });
      console.log("ERR : ", err);
    });
};

export const signUp = msg => async dispatch => {
  await fetch(`${customBaseUrl}/users/signup`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(msg)
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        // alert(res.error);
        RNToasty.Error({ title: res.error,
        });
        throw res.error; 
      } else {
        console.log("user created : ", res);
        AsyncStorage.setItem("MLuserInfo",JSON.stringify(res)); 

        dispatch({
          type: SETUSERDATA,
          payload: res
        });
        Navigation.navigate("Home");
      }
    })
    .catch(err => {
      dispatch({
        type: LOADING,
        payload: false
      });
      console.log("ERR : ", err);
    });
};


export const checkUser = (userData={}) => async dispatch => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  const currentUser = await GoogleSignin.getCurrentUser();
  const localUserData = await AsyncStorage.getItem("MLuserInfo"); 

  console.log("google Sign : ", isSignedIn);
  console.log("local Sign : ", localUserData);
  
  
  if (isSignedIn || localUserData){
    Navigation.navigate("Home");
    let userData = await AsyncStorage.getItem("MLuserInfo")
    dispatch({
      type:SETUSERDATA,
      payload:JSON.parse(userData)
    })
  } else {
    Navigation.navigate("Login");
  }
}

export const loadingFun = (loading)=> async dispatch => {

console.log("loading : ", loading);

  dispatch({
    type:LOADING,
    payload:loading
  })
}