import { StyleSheet,Dimensions } from "react-native";
const { width: Width, height: Height } = Dimensions.get("window")


export const styles = StyleSheet.create({
  headLine: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'Lato-Light',
    marginBottom: 0.06 * Height
},
noMoviesCont:{
    width:Width,
    height:0.5*Height,
    alignItems:'center',
    justifyContent:'center',
    
}
});
