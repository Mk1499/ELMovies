import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Switch ,AsyncStorage,ScrollView,FlatList} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import { Icon, Left, Radio, Right, Item, CardItem } from "native-base";
import { WEB_CLIENT_ID } from "../../configs/keys";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-community/google-signin";
import { googleLogout} from '../../actions/auth'; 
import { mainColor, textColor, bgColor } from "../../configs/global";


class userProfile extends Component {
  constructor(props) {
    super(props);
    console.log("User Info : ", this.props.userInfo);
    this.state = { 
      darkMode : true
    }
  }

  logOut = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn){
      this.props.googleLogout()
    } else {
      await AsyncStorage.setItem("MLuserData","")
      
    }

    this.props.navigation.replace("Splash")
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.headView}>
            <Left>
              {/* <View style={styles.themeSwitch}>
                <Icon name="theme-light-dark" type="MaterialCommunityIcons" style={{color:mainColor}} />
                <Switch
                  trackColor={{ false: "#767577", true: bgColor }}
                  thumbColor={this.state.darkMode ? bgColor : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(v) => {this.setState({darkMode:v})}}
                  value={this.state.darkMode}
                />
              </View> */}
            </Left>
            <Right>
              <TouchableOpacity onPress={this.logOut}>
                <Icon name="log-out" style={styles.logoutIcon} type="Feather" />
              </TouchableOpacity>
            </Right>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: this.props.userInfo.photo || this.props.userInfo.avatarurl
            }}
            style={styles.profileImg}
          />
          <Text style={styles.userName}>
            {" "}
            {this.props.userInfo.name || this.props.userInfo.fullname}{" "}
          </Text>
        </View>

        <View  style={styles.sectionView}>
          <Text style={styles.headLine}>Your Movies List </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

export default connect(mapStateToProps, {googleLogout})(userProfile);
