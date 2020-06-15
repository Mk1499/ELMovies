import { StyleSheet, Dimensions } from "react-native";
import { mainColor, textColor } from "../../configs/global";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  containerBG: {
    alignItems: "center",
    justifyContent: "center",
    height
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height,
    width,
    backgroundColor: "rgba(254,44,84,0.5)"
  },
  LogoContainer: {
    flexDirection: "row"
  },
  form: {
    width: 0.9 * width,
    marginBottom: 0.05 * height
  },
  input: {
    color: "#fff",
    borderColor: "#fff"
  },
  logoImg: {
    width: 0.2 * width,
    height: 0.2 * height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  appName: {
    color: "#eee",
    // fontWeight: "bold",
    fontSize: 0.09 * width,
    width: 0.4 * width,
    fontFamily: "Oswald"
  },
  appNameView: {
    justifyContent: "center",
    overflow: "hidden",
    width: 50
  },
  signUpHeadText:{
    textAlign:'center',
    color:textColor,
    fontSize:0.04 * width
  },
  signUpClickText:{
    textAlign:'center',
    color:textColor,
    fontSize:0.04 * width,
    fontWeight:'bold'
  }

});
