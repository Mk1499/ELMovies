import { StyleSheet, Dimensions } from "react-native";
import { mainColor } from "../../configs/global";

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
    height: 0.2 * width
  },
  appName: {
    color: "#eee",
    fontWeight: "bold",
    fontSize: 20,
    width: 200,
    fontFamily:"Roboto"
  },
  appNameView: {
    justifyContent: "center",
    overflow: "hidden",
    width: 50
  }
});
