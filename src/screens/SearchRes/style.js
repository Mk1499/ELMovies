import { StyleSheet, Dimensions } from "react-native";
const { width: Width, height: Height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  headLine: {
    fontSize: 0.07*Width,
    color: "#333",
    fontFamily: "Lato-Light",
    marginBottom: 0.06 * Height,
    
  },
  rowView: {
    flexDirection: "row"
  },
  notFoundLine:{
    fontSize: 0.05*Width,
    color: "#333",
    fontFamily: "Lato-Light",
    marginBottom: 0.06 * Height,
  },
  notFound: {
    alignItems: "center",
    justifyContent: "center",
    height: 0.6 * Height
  }
});
