import {StyleSheet , Dimensions} from 'react-native';
import {mainColor,textColor} from '../../configs/global'; 

const { width: Width, height: Height } = Dimensions.get("window")


export const styles = StyleSheet.create({
    bigMovie: {
        flexDirection: 'row',
        marginBottom : 0.1 * Height
    },
    bigMovieData: {
        flexDirection: "column"
    },
    bigMovieTitle: {
        fontSize: 0.05 *Width,
        color: textColor,
        fontFamily: 'Lato-Light',
        fontWeight: '300',
        marginVertical: 0.015 * Height, 
        width:0.4 * Width, 
        fontWeight:'500'

    },
    bigMovieViews:{
        flexDirection:"row",
        marginVertical: 0.015 * Height ,
    },
    bigMovieViewsNum: {
        fontSize: 17,
        color: textColor,
        fontFamily: 'Lato-Light',
        fontWeight: '100',
        marginHorizontal : 0.02*Width,
        marginVertical: 0.008 * Height ,

    },
    bigMovieDesc: {
        fontSize: 15,
        color: textColor,
        fontFamily: 'Lato-Light',
        fontWeight: '100',
        marginVertical: 0.015 * Height,
        width:0.4*Width,
        height : 0.15* Height
    },
    bigMovieRate: {
        fontSize: 20,
        color: textColor,
        marginHorizontal: 0.02 * Width
    },
    bigMovieFavBtn: {
        marginTop: 0.02 * Height,
        flexDirection: 'row',
        backgroundColor: mainColor,
        padding: 0.03 * Width,
        width: 0.4 * Width,
        borderRadius: 5
    },
    bigMovieFavBtnIcon: {
        marginRight: 0.02 * Width,
        color: "red"
    },
    bigMovieImg: {
        width: 0.45 * Width,
        height: 0.45 * Height,
        borderRadius: 20,
        marginRight: 0.05 * Width

    }
})