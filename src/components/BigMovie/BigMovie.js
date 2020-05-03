import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import {mainColor} from '../../configs/global';
import { styles } from './styles';
const { width: Width, height: Height } = Dimensions.get("window")
import Image from "react-native-image-progress";
import * as Progress from 'react-native-progress'; 

export default class BigMovie extends Component {

    constructor(props){
        super(props);
        this.state = {
            disabled : false 
        }
    }

    disableBtn = () => {
        this.setState({
            disabled : true 
        })
    }
    render() {
        return (
            <View style={styles.bigMovie}>
                <Image source={{ uri: "https://image.tmdb.org/t/p/original/"+this.props.movie.poster_path || "https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif"}} 
                style={styles.bigMovieImg}
                imageStyle={styles.bigMovieImg}
                indicator={Progress.Bar}
                indicatorProps={{
                    borderWidth: 0,
                    color: mainColor,
                    unfilledColor: "rgba(200, 200, 200, 0.2)"
                  }}
                />
                <View style={styles.bigMovieData}>
                    <Text style={styles.bigMovieTitle}>{this.props.movie.title|| this.props.movie.original_name}</Text>
                    <View style={styles.bigMovieViews}>
                        <Icon name="eye" style={{ color: mainColor }} />
                        <Text style={styles.bigMovieViewsNum}>{this.props.movie.vote_count}</Text>
                    </View>
                    <Text style={styles.bigMovieDesc}>{this.props.movie.overview}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='star' style={{ color: 'gold' }} />
                        <Text style={styles.bigMovieRate}>{this.props.movie.vote_average}/10</Text>
                    </View>
                    {/* <TouchableOpacity style={styles.bigMovieFavBtn} disabled={this.state.disabled} onPress={this.disableBtn && this.props.addToFav}>
                        <Icon name="heart" style={styles.bigMovieFavBtnIcon} />
                        <Text style={{ marginTop: 0.005 * Height,color:"#000" }}>Add to Favourits</Text>
                    </TouchableOpacity> */}

                </View>
            </View>
        )
    }
}
