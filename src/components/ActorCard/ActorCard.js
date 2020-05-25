import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import {} from "native-base";
import { mainColor, textColor } from "../../configs/global";
import styles from "./style";

export default class ActorCard extends Component {
  constructor(props) {
    super(props);
    console.log("Props : ", this.props.actor);
  }

  render() {
    let { name, popularity, profile_path } = this.props.actor.item;
    return (
      <View style={styles.cardCont} onPress={this.goToActorProfile}>
        <Image
          source={
            profile_path != null ?
            {
            uri:
              "https://image.tmdb.org/t/p/original" +
              profile_path
            }
              : require('../../../assets/images/actor.png')
        }
          style={styles.cardImg}
        />
        <View style={styles.actorInfoView}>
          <Text style={styles.actorName}>{name}</Text>
          <Text style={styles.text}>{popularity}</Text>
        </View>
      </View>
    );
  }
}
