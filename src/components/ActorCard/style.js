import { StyleSheet, Dimensions } from "react-native";
import {mainColor,textColor} from '../../configs/global'
const { width: Width, height: Height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  cardCont: {
      marginVertical:0.02*Height,
      flexDirection:'row',
    //   backgroundColor:'#fff'
  },
  cardImg: {
    width:"33%",
    height: 0.3 * Height,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:'#fff'
  },
  actorInfoView:{
    backgroundColor:mainColor, 
    width: "70%",
    height:0.2*Height, 
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    marginTop:0.1*Height,
    marginLeft:-0.1*Width,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5
  }, 
  actorName:{
      color:textColor,
    //   fontWeight:'bold',
      fontFamily:'Roboto',
      fontSize:0.05*Width
  },
  text:{
    color:textColor,
    // fontWeight:'bold',
    fontFamily:'Lato-Light'
  }
});
