import { StyleSheet, Dimensions } from "react-native";
const { width: Width, height: Height } = Dimensions.get("window");
import {textColor} from '../../configs/global';

export const styles = StyleSheet.create({
  headLine: {
    fontSize: 0.05*Width,
    color: textColor,
    fontFamily: "Lato-Light",
    // marginBottom: 0.06 * Height,
    
  },
  rowView: {
    flexDirection: "row",
    // justifyContent:'center',
    alignItems:'center',
    height:0.1*Height,
    
  },
  backIcon:{
    marginHorizontal:0.05*Width,
    color:textColor
  },
  notFoundLine:{
    fontSize: 0.05*Width,
    color: "#333",
    fontFamily: "Lato-Light",
    marginBottom: 0.06 * Height,
    color:textColor

  },
  notFound: {
    alignItems: "center",
    justifyContent: "center",
    height: 0.6 * Height,
    color:textColor
  }
});
