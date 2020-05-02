
import {StyleSheet , Dimensions} from 'react-native';
import {mainColor} from '../../configs/global'; 

const { width: Width, height: Height } = Dimensions.get("window");


export const styles = StyleSheet.create({
    smallActor: {
        marginHorizontal: 0.05 * Width
    },
    smallActorImg: {
        width: 0.4 * Width,
        height: 0.3 * Height,
        borderRadius: 20,
        marginBottom: 0.03 * Height
    },
    smallActorTitle: {
        color: '#333',
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