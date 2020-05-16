import { StyleSheet, Dimensions } from "react-native";
import {textColor} from '../../configs/global';

const { width: Width, height: Height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  smallMovie: {
    marginHorizontal: 0.05 * Width
  },
  smallMovieImg: {
    width: 0.45 * Width,
    height: 0.4 * Height,
    borderRadius: 20,
    marginBottom: 0.03 * Height,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  smallMovieTitle: {
    color: textColor,
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Lato-Light",
    maxWidth:0.3*Width,
    textAlign:'center'

  },
  indecator: {}
});
