
import {StyleSheet , Dimensions} from 'react-native';
import {mainColor,textColor} from '../../configs/global'; 

const { width: Width, height: Height } = Dimensions.get("window");


export const styles = StyleSheet.create({
    smallActor: {
        marginHorizontal: 0.05 * Width
    },
    smallActorImg: {
        width: 0.4 * Width,
        height: 0.4 * Height,
        borderRadius: 20,
        marginBottom: 0.03 * Height
    },
    smallActorTitle: {
        color: textColor,
        alignSelf: 'center',
        fontSize: 0.05*Width,
        fontFamily: 'Lato-Light'
    },
    actorCharacter:{
        color: mainColor,
        alignSelf: 'center',
        fontSize: 0.03*Width,
        fontFamily: 'Lato-Light'
    }
})