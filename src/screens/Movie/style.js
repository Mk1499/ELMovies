import { StyleSheet, Dimensions } from "react-native";
import {mainColor} from '../../configs/global'; 
const { width: Width, height: Height } = Dimensions.get("window");


export const styles = StyleSheet.create({
  contianer: {
    width: Width,
    height: Height,
    backgroundColor: "#eee"
  },
  coverImg: {
    width: Width,
    height: 0.45 * Height,
    resizeMode: "cover"
  },
  moviePosterView: {
    marginTop: -0.2 * Height,
    marginHorizontal: 0.03 * Width,
    backgroundColor: "rgba(0,0,0,0)",
    width: 0.45 * Width,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23
  },
  moviePoster: {
    width: 0.45 * Width,
    height: 0.35 * Height,
    borderRadius: 15, 
    backgroundColor:"#fff"
  },
  favIcon: {
    marginRight: 0.03 * Width,
    color: "red",
    fontSize: 40
  },
  Icon: {
    color: "orange",
    fontSize: 40,
  },
  iconCont:{
    width:0.25*Width,
    alignItems:'center',
    
  },

  movieTitle: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 30
  },
  movieData: {
    paddingVertical: 0.01 * Height,
    paddingHorizontal: 0.1 * Width,
    marginTop: 0.05 * Height,
    borderTopColor: "#ddd",
    borderTopWidth: 1
  },
  headLine: {
    fontSize: 0.07 * Width,
    color: mainColor,
    fontFamily: "Roboto",
    marginVertical: 0.05 * Height
  },
  overview: {
    fontFamily: "Lato-Light",
    fontSize: 0.05*Width,
    textAlign: "center",
    marginBottom: 0.06 * Height
  }
});
