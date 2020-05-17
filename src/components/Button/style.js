import {StyleSheet, Dimensions} from 'react-native';
import { mainColor } from '../../configs/global';

const {width,height} = Dimensions.get("window"); 

export default styles = StyleSheet.create({
    btn:{
        backgroundColor:mainColor,
        height:0.1*height,
    }
})