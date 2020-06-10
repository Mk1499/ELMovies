import React, { Component } from "react";
import { Text, View, Image, ImageBackground, Animated,Dimensions , AsyncStorage} from "react-native";
import styles from "./style";

import { connect } from "react-redux";
import { googleLogin , signIn,checkUser} from "../../actions/auth";
import {GoogleSignin} from '@react-native-community/google-signin'; 
import BG from "../../../assets/images/bg.jpg";
import { Form, Input, Item } from "native-base";
import Btn from "../../components/Button/Button";
import {WEB_CLIENT_ID} from '../../configs/keys'; 

const {width:Width} = Dimensions.get("window"); 

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textWidth: new Animated.Value(0),
      logoOpacity: new Animated.Value(0.5),
      email:"MKe@mail.com",
      password:"123456789"
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    this.animatedWidth();
    this.animatedOpacity();
    setTimeout(()=> {

        this.props.checkUser(); 
    }, 1700)
  }

  animatedWidth = () => {
    Animated.timing(this.state.textWidth, {
      toValue: 0.4*Width,
      duration: 1000
    }).start();
  };

  animatedOpacity = () => {
    Animated.timing(this.state.logoOpacity, {
      toValue: 1,
      duration: 1000
    }).start();
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    this.setState({ isLoginScreenPresented: !isSignedIn });
  }; 

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({ currentUser });
  };


  render() {
    return (
      <ImageBackground source={BG} style={styles.containerBG}>
        <View style={styles.container}>
          <View style={styles.LogoContainer}>
            <Animated.View style={{ opacity: this.state.logoOpacity }}>
              <Image
                style={[styles.logoImg]}
                source={require("../../../assets/images/logo2.png")}
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.View
              style={[styles.appNameView, { width: this.state.textWidth }]}
            >
              <Text style={styles.appName}>Movie Lab</Text>
            </Animated.View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

export default connect(mapStateToProps, { googleLogin,signIn , checkUser})(Splash);