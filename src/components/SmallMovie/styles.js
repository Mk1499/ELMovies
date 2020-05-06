
import {StyleSheet , Dimensions} from 'react-native';

const { width: Width, height: Height } = Dimensions.get("window");


export const styles = StyleSheet.create({
    smallMovie: {
        marginHorizontal: 0.05 * Width
    },
    smallMovieImg: {
        width: 0.45 * Width,
        height: 0.4 * Height,
        borderRadius: 20,
        marginBottom: 0.03 * Height
    },
    smallMovieTitle: {
        color: '#333',
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'Lato-Light'
    },
    indecator:{
   
      }
})