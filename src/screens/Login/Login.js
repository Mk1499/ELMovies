import React, { Component } from "react";
import { Text, View, Image, ImageBackground, Alert } from "react-native";
import styles from "./style";
import { WEB_CLIENT_ID } from "../../configs/keys";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-community/google-signin";
import { connect } from "react-redux";
import { googleLogin } from "../../actions/auth";
import BG from "../../../assets/images/bg.jpg";
import {Form,Input,Item} from 'native-base'; 
import Btn from '../../components/Button/Button';


class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }

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
        <Form style={styles.form}>
            <Item>
              <Input placeholder="Username" style={styles.input} placeholderTextColor="#eee" />
            </Item>
            <Item last>
              <Input placeholder="Password" style={styles.input} placeholderTextColor="#eee"/>
            </Item>
              <Btn title="Sign In" action={()=>{alert("sdjknj")}} />
          </Form>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this.props.googleLogin}
            //   disabled={this.state.isSigninInProgress}
          />
          <Text>{this.props.userInfo.email}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

export default connect(mapStateToProps, { googleLogin })(Login);
