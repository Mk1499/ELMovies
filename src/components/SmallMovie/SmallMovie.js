import React, { Component } from 'react'
import { Text, View , Image } from 'react-native';
import {styles} from './styles';


export default class SmallMovie extends Component {
    render() {
        return (
            <View style={styles.smallMovie}>
                <Image source={{ uri:"https://image.tmdb.org/t/p/original/"+this.props.movie.poster_path}} style={styles.smallMovieImg} />
                <Text style={styles.smallMovieTitle}>{this.props.movie.title}</Text>
            </View>
        )
    }
}

