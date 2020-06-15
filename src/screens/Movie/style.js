import { StyleSheet, Dimensions } from "react-native";
import { mainColor, bgColor, textColor } from "../../configs/global";
const { width: Width, height: Height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  contianer: {
    width: Width,
    height: Height
    // backgroundColor: bgColor
  },
  coverImg: {
    width: Width,
    height: 0.5 * Height,
    resizeMode: "cover"
  },
  movieDataView: {
    marginTop: -0.03 * Height,
    backgroundColor: bgColor,
    borderTopRightRadius: 0.03 * Height,
    borderTopLeftRadius: 0.03 * Height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  },
  playIcon: {
    position: "absolute",
    right: 0.08 * Width,
    width: 0.15 * Width,
    height: 0.15 * Width,
    backgroundColor: mainColor,
    justifyContent: "center",
    alignItems:'center',
    borderRadius: 25,
    zIndex: 2000,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
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
    height: 0.45 * Width,
    borderRadius: 0.5 * Width,
    backgroundColor: "#fff"
  },
  favIcon: {
    marginRight: 0.03 * Width,
    color: bgColor,
    fontSize: 40
  },
  Icon: {
    color: "orange",
    fontSize: 40
  },
  iconCont: {
    width: 0.25 * Width,
    alignItems: "center"
  },

  movieTitle: {
    color: textColor,
    fontFamily: "Roboto",
    fontSize: 0.07 * Width
  },
  movieData: {
    paddingVertical: 0.01 * Height,
    paddingHorizontal: 0.1 * Width,
    marginTop: 0.05 * Height,
    flexDirection:'row'
    // borderTopColor: "#ddd",
    // borderTopWidth: 1
  },
  headLine: {
    fontSize: 0.07 * Width,
    color: mainColor,
    fontFamily: "Roboto",
    marginVertical: 0.05 * Height
  },
  overview: {
    fontFamily: "Lato-Light",
    fontSize: 0.05 * Width,
    textAlign: "center",
    marginBottom: 0.06 * Height,
    color: textColor
  },
  dateText: {
    color: 'grey'
  }
});
