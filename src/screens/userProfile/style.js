import { StyleSheet, Dimensions } from "react-native";
import { mainColor, textColor, bgColor } from "../../configs/global";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor:bgColor
  },
  topView: {
    height: 0.4 * height,
    backgroundColor: mainColor,
    borderBottomRightRadius: 0.25 * width,
    borderBottomLeftRadius: 0.25 * width, 
  },
  userInfo: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bgColor,
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
    width: "100%",
    height: "100%",
    borderRadius: 0.1 * height,
    // marginBottom: 0.02 * height,
    // marginTop:-0.2*height,
    // borderWidth:10,
    // borderColor:"#eee",
    // zIndex:50
    
  },
  profileImgBtn: {
    width: 0.2 * height,
    height: 0.2 * height,
    borderRadius: 0.1 * height,
    marginBottom: 0.02 * height,
    marginTop:-0.2*height,
    borderWidth:10,
    borderColor:"#eee",
    zIndex:50
    
  },
  userName: {
    color: textColor,
    // fontWeight:'bold',
    fontSize:0.07*width,
    fontFamily:"Lato-Light"
  }, 
  logoutIcon:{
    color:bgColor,
    // alignSelf:'flex-end', 
    
    fontSize:0.1 * width
  }, 
  themeSwitch:{
    // alignSelf:'flex-start',
    marginLeft:0.03*width,
    alignItems:'center',
    paddingTop:0.01*height
  }, 
  headView : {
    marginRight:0.05 *width, 
    marginTop:0.05*height,
    flexDirection:'row', 
    
  },
  headLine: {
    fontSize: 0.07 * width,
    color: mainColor,
    fontFamily: "Lato-Light",
    marginBottom: 0.06 * height
  },
  sectionView:{
    marginTop:0.1*height,
    marginBottom:0.1*height,
    marginLeft:0.04*width,
  } ,
  emptyMsg:{
    textAlign:"center",
    color:textColor,
    fontFamily:"Lato-Light",
    fontSize:0.05*width
  }

});
