import { StyleSheet, Dimensions , Platform } from "react-native";
const { width: Width, height: Height } = Dimensions.get("window");
import {mainColor} from '../../configs/global'

export const styles = StyleSheet.create({
  searchForm: {
    shadowColor: mainColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    
    elevation: 6,
    backgroundColor:"#eee",
    borderRadius:20,
    paddingRight:0.05 * Width, 
    borderColor:mainColor,
    borderWidth:2
  },
  label: {
    color: "grey",
    fontWeight: "100",
    fontFamily: "Lato-Light"
  },
  searchView:{
    position:'absolute',
    zIndex:50,
    width: 0.9*Width,
    marginHorizontal:0.05 *Width,
    top: Platform.OS === "ios" ? 0.1*Height : 0.04*Height
  },
  searchInput: {
    height: 0.1 * Height,
    fontSize: 0.05*Width,
    fontFamily: "Lato-Light",
    color: "#333",
  },
  scrollVeiwCont:{
    marginTop:  Platform.OS === "ios" ?  0.25*Height : 0.15*Height
  },
  headLine: {
    fontSize: 0.07 * Width,
    color: mainColor,
    fontFamily: "Lato-Light",
    marginBottom: 0.06 * Height
  },
  section: {
    paddingHorizontal: 0.05 * Width,
    marginVertical: 0.05 * Width,
    minHeight:0.4 * Height
  },
  nowPlayingMovies: {
    height: 0.3 * Height,
    alignItems: "center",
    justifyContent: "center"
  }
});
