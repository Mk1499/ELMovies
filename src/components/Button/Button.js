import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native';
import {mainColor} from '../../configs/global'
import styles from './style'; 

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity 
                onPress={this.props.action}
                style={styles.btn}
            >
    <Text>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}
