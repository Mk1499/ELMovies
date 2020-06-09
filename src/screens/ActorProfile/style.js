import {StyleSheet, Dimensions, Animated, PanResponder} from 'react-native';
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const { width, height } = Dimensions.get("screen");
import { mainColor,bgColor ,textColor} from "../../configs/global";

export const animation = new Animated.ValueXY({x: 0, y: 0 });

export const animatedHeight = {
    transform: animation.getTranslateTransform(),
  };
  

export const animatedImageHeight = animation.y.interpolate({ 
    inputRange: [0, 0.9 * ScreenHeight],
    outputRange: [0.35 * ScreenHeight, 0.06 * ScreenHeight],
    extrapolate: 'clamp',
  });

  export default styles = StyleSheet.create({
    mainView: {
      marginTop: -0.1 * height,
      backgroundColor: bgColor,
      padding: 0.05 * width,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
  
      elevation: 5,
      height: 0.83 * height,
      color: textColor
    },
  
    iconView: {
      width: 0.125 * width,
      height: 0.125 * width,
      borderWidth: 2,
      borderColor: "#333",
      borderRadius: 0.5 * 0.125 * width,
      alignItems: "center",
      justifyContent: "center"
    },
    sectionTitle: {
      fontSize: 0.06 * width,
      marginBottom: 0.03 * height,
      color: mainColor,
      fontFamily:"Roboto"
    },
    iconMainView: {
      width: 0.45 * width,
      alignItems: "center"
    },
    upDownBtn: {
      flexDirection: "row-reverse",
      width: 0.4 * width
    },
    iconText:{
      color: mainColor,
      textAlign: "center",
      marginTop: 15,
      color:textColor
    },
    note:{
      fontSize: 0.05 * width,
      color: mainColor
    },
    actorName:{
      fontSize: 0.08 * width,
      fontWeight: "bold",
      color:textColor

    }
  
  });