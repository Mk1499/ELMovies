import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
  Dimensions
} from "react-native";
import styles from "./signUpStyle";
import { WEB_CLIENT_ID } from "../../configs/keys";
import { customBaseUrl } from "../../configs/global";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-community/google-signin";
import { connect } from "react-redux";
import { googleLogin, signUp , loadingFun } from "../../actions/auth";
import BG from "../../../assets/images/bg.jpg";
import { Form, Input, Item } from "native-base";
import Btn from "../../components/Button/Button";

const { width: Width } = Dimensions.get("window");

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textWidth: new Animated.Value(0),
      logoOpacity: new Animated.Value(0.5),
      email: "",
      fullname: "",
      password1: "",
      password2: ""
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    this.animatedWidth();
    this.animatedOpacity();
  }

  animatedWidth = () => {
    Animated.timing(this.state.textWidth, {
      toValue: 0.4 * Width,
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

  signUp = async () => {
    console.log("Sign Up...");
    if (this.state.password1 === this.state.password2) {
      let msg = {
        fullName: this.state.fullname,
        email: this.state.email,
        phone: "01121858581",
        password: this.state.password1
      };
      await this.props.signUp(msg);
    } else {
      this.props.loadingFun(false);
      alert("Sorry but two passwords must be the same");
    }
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
          <Form style={styles.form} >
            <Item>
              <Input
                placeholder="Full Name"
                style={styles.input}
                placeholderTextColor="#eee"
                onChangeText={name =>
                  this.setState({
                    fullname: name
                  })
                }
              />
            </Item>
            <Item>
              <Input
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#eee"
                onChangeText={email =>
                  this.setState({
                    email
                  })
                }
              />
            </Item>
            <Item>
              <Input
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="#eee"
                onChangeText={password1 => {
                  this.setState({
                    password1
                  });
                }}
                secureTextEntry={true}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Confirm Password"
                style={styles.input}
                placeholderTextColor="#eee"
                onChangeText={password2 => {
                  this.setState({
                    password2
                  });
                }}
                secureTextEntry={true}
              />
            </Item>
            <Btn title="Sign Up" action={this.signUp} />
          </Form>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this.props.googleLogin}
            //   disabled={this.state.isSigninInProgress}
          />
          {/* <Text>{this.props.userInfo.email}</Text> */}
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
});

export default connect(mapStateToProps, { googleLogin, signUp , loadingFun})(Signup);
