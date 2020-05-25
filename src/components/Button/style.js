import {StyleSheet, Dimensions} from 'react-native';
import { mainColor } from '../../configs/global';

const {width,height} = Dimensions.get("window"); 

export default styles = StyleSheet.create({
    btn:{
        backgroundColor:mainColor,
        height:0.1*height,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:0.1*height,
        marginTop:0.1*height
    },
    btnText:{
        color:"#eee",
        fontWeight:'bold',
        fontSize:0.06*width,
        fontFamily:'DM Mono'
    }
})