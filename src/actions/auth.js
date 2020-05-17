import { WEB_CLIENT_ID } from "../configs/keys";
import {SETUSERDATA} from './types';
import Navigation from '../routes/NavigationServices';


import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
  } from "@react-native-community/google-signin";


export const googleLogin = () => async dispatch => {
    console.log("ID : ", WEB_CLIENT_ID);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn()

      Navigation.navigate("Home")
      dispatch({
          type:SETUSERDATA,
          payload:userInfo
      })
      
      console.log("User Info : ", userInfo);
      
    } catch (error) {
        console.log('error : ', error.code)
        console.log("Res : ",error.resolution);
        
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
}

export const googleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };