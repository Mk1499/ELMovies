import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { mainColor } from "../../configs/global";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

export default class SmallMovie extends Component {
  render() {
    return (
      <View style={styles.smallMovie}>
        <Image
          source={{
            uri:
              "https://image.tmdb.org/t/p/original/" +
              this.props.movie.poster_path
          }}
          style={styles.smallMovieImg}
          imageStyle={styles.smallMovieImg}
          indicator={Progress.Bar}
          indicatorProps={{
            borderWidth: 0,
            color: mainColor,
            unfilledColor: "rgba(200, 200, 200, 0.2)"
          }}
        />
        <Text style={styles.smallMovieTitle}>
          {this.props.movie.title || this.props.movie.original_name}
        </Text>
      </View>
    );
  }
}
