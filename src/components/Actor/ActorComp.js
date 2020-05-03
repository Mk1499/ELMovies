import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "./Actorstyles";
import Image from "react-native-image-progress";
import { mainColor } from "../../configs/global";
import * as Progress from "react-native-progress";

export default class ActorComp extends Component {
  componentDidMount() {
   // console.log("Actor Data : ", this.props.actor);
  }

  render() {
    return (
      <View style={styles.smallActor}>
        <Image
          source={
            this.props.actor.profile_path != null ?
            {
            uri:
              "https://image.tmdb.org/t/p/original" +
              this.props.actor.profile_path
            }
              : require('../../../assets/images/actor.png')
        }
          style={styles.smallActorImg}
          indicator={Progress.Bar}
          imageStyle={styles.smallActorImg}
          indicatorProps={{
            size: 45,
            borderWidth: 0,
            color: mainColor,
            unfilledColor: "rgba(200, 200, 200, 0.2)"
          }}
        />

        <Text style={styles.smallActorTitle}>{this.props.actor.name}</Text>
        <Text style={styles.actorCharacter}>{this.props.actor.character}</Text>
      </View>
    );
  }
}
