import React, { Component } from "react";
import { Text, View, TouchableOpacity,ActivityIndicator } from "react-native";
import { mainColor } from "../../configs/global";
import styles from "./style";

export default class Button extends Component {

  constructor(props){
    super(props); 
    this.state = {
      loading:false 
    }
  }
  render() {
    return (
      <TouchableOpacity onPress={()=>{
        this.props.action}} style={styles.btn}>
        {this.state.loading ? 
        <ActivityIndicator />  
      : 
        <Text style={styles.btnText}>{this.props.title}</Text>
      }
      </TouchableOpacity>
    );
  }
}
