import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
  Dimensions,
  ActivityIndicator
} from "react-native";
import styles from "./style";
import { WEB_CLIENT_ID } from "../../configs/keys";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-community/google-signin";
import { connect } from "react-redux";
import { googleLogin, signIn, loadingFun } from "../../actions/auth";
import BG from "../../../assets/images/bg.jpg";
import { Form, Input, Item } from "native-base";
import Btn from "../../components/Button/Button";
import { Easing } from "react-native-reanimated";

const { width: Width , height:Height} = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textWidth: new Animated.Value(0),
      logoOpacity: new Animated.Value(0.5),
      logoTransform: new Animated.Value(0),
      email: "MKe@mail.com",
      password: "123456789"
    };
    this.rotateValue = new Animated.Value(0);
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    this.animatedWidth();
    this.animatedOpacity();
    this.logoRotation();
  }

  animatedWidth = () => {
    Animated.timing(this.state.textWidth, {
      toValue: 0.4 * Width,
      duration: 1000
    }).start();
  };

  logoRotation = () => {
    Animated.timing(this.state.logoTransform, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
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

  signIn = async () => {
    // this.props.navigation.replace("Home")
    if (this.state.email && this.state.password) {
      let email = this.state.email.toLowerCase();
      let pw = this.state.password.toLowerCase();

      let msg = {
        email: email.replace(/\s/g, ""),
        password: pw.replace(/\s/g, "")
      };
      await this.props.signIn(msg).catch(err => console.log(("error: ", err)));
    } else {
      this.props.loadingFun(false)
      alert("Sorry but email and password must be Entered")
    }
  };

  goToSignUp = () => {
    this.props.navigation.navigate("SignUp");
  };

  render() {
    let rotation = this.state.logoTransform.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"] // degree of rotation
    });

    return (
      <ImageBackground source={BG} style={styles.containerBG}>
        <View style={styles.container}>
          <View style={styles.LogoContainer}>
            <Animated.View
              style={{
                opacity: this.state.logoOpacity,
                transform: [{ rotate: rotation }]
              }}
            >
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
          <Form style={styles.form}>
            <Item>
              <Input
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#eee"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="#eee"
                onChangeText={password => this.setState({ password })}
                passwordRules={true}
                secureTextEntry={true}
              />
            </Item>
            <Btn title="Sign In" action={this.signIn} />
          </Form>
          <View style={{ flexDirection: "row",marginBottom:0.03* Height}}>
            <Text style={styles.signUpHeadText}>Don't Have account ? </Text>
            <Text style={styles.signUpClickText} onPress={this.goToSignUp}>
              Sign Up Now
            </Text>
          </View>
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
  userInfo: state.auth.userInfo
});

export default connect(mapStateToProps, { googleLogin, signIn , loadingFun })(Login);
