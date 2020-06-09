import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { mainColor } from "../../configs/global";
import styles from "./style";
import { connect } from "react-redux";
import {loadingFun} from '../../actions/auth'; 

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.action();
          this.props.loadingFun(true);
        }}
        style={styles.btn}
      >
        {this.props.loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text style={styles.btnText}>{this.props.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.auth.loading
});

export default connect(mapStateToProps, {loadingFun})(Button);
