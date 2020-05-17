import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import styles from "./style";
import { connect } from "react-redux";

class userProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}></View>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: this.props.userInfo.photo }}
            style={styles.profileImg}
          />
          <Text style={styles.userName}> {this.props.userInfo.name} </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

export default connect(mapStateToProps, {})(userProfile);
