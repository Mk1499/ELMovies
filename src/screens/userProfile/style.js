import { StyleSheet, Dimensions } from "react-native";
import { mainColor, textColor, bgColor } from "../../configs/global";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    width,
    height
  },
  topView: {
    height: 0.4 * height,
    backgroundColor: bgColor,
    borderBottomRightRadius: 0.25 * width,
    borderBottomLeftRadius: 0.25 * width
  },
  userInfo: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mainColor,
    width: 0.9 * width,
    borderRadius: 20,
    paddingVertical: 0.1 * height,
    marginTop: -0.15 * height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },

  profileImg: {
    width: 0.2 * height,
    height: 0.2 * height,
    borderRadius: 0.1 * height,
    marginBottom: 0.02 * height,
    marginTop:-0.2*height,
    borderWidth:10,
    borderColor:"#eee",
    
  },
  userName: {
    color: textColor,
    fontWeight:'bold',
    fontSize:0.07*width
  }
});
