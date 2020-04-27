import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'native-base';

import { styles } from './styles';
const { width: Width, height: Height } = Dimensions.get("window")

export default class FavMovie extends Component {
    render() {
        return (
            <View style={styles.bigMovie}>
                <Image source={{ uri: "https://image.tmdb.org/t/p/original/" + this.props.movie.poster_path }} style={styles.bigMovieImg} />
                <View style={styles.bigMovieData}>
                    <Text style={styles.bigMovieTitle}>{this.props.movie.title}</Text>
                    <View style={styles.bigMovieViews}>
                        <Icon name="eye" style={{ color: 'gold' }} />
                        <Text style={styles.bigMovieViewsNum}>{this.props.movie.vote_count}</Text>
                    </View>
                    <Text style={styles.bigMovieDesc}>{this.props.movie.overview}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='star' style={{ color: 'gold' }} />
                        <Text style={styles.bigMovieRate}>{this.props.movie.vote_average}/10</Text>
                    </View>
                    <TouchableOpacity style={styles.bigMovieFavBtn} onPress={() => alert("DisFav Pressed")}>
                        <Icon name="heart-dislike" style={styles.bigMovieFavBtnIcon} />
                        <Text style={{ marginTop: 0.005 * Height,color:"#000" }}>Remove from Favourits</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
