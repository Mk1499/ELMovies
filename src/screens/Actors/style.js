import {StyleSheet,Dimensions,Platform} from 'react-native';
const { width: Width, height: Height } = Dimensions.get("window");
import {mainColor} from '../../configs/global' 

export default styles = StyleSheet.create({
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
      actorsListCont:{
        height:Height,
        marginTop:0.2*Height,
        marginHorizontal:0.05*Width

      },
      headLine: {
        fontSize: 0.07 * Width,
        color: mainColor,
        fontFamily: "Lato-Light",
        marginBottom: 0.06 * Height
      },
      sectionView:{
        marginTop:0.2*Height,
        marginBottom:0.1*Height
      }

})