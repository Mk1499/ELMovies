import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Share, AsyncStorage } from 'react-native';
import { Item, Icon, Left, Body, Right, Content, CardItem } from 'native-base'
import { async } from 'rxjs/internal/scheduler/async';
// import { styles } from '../../components/BigMovie/styles';
const { width: Width, height: Hight } = Dimensions.get("window");

export default class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: this.props.navigation.getParam('movie') , 
            movieInFav : false 
        }
    }

    componentDidMount= async()=>{
        let m = await this.existInFav(this.state.movie)
        this.setState({
            movieInFav : m
        })
    }
    back = () => {
        this.props.navigation.goBack();
    }

    //check if movies in Fav List 
    existInFav = async (movie) => {
        let stringList = await AsyncStorage.getItem('favMoviesList');
        let list = JSON.parse(stringList);

        for (let i = 0; i < list.length; i++) {
            if (JSON.stringify(movie) === JSON.stringify(list[i]))
                return true;
        }
        return false;

    }

    // add movie to favourits 
    addToFav = async (movie) => {
        try {
            AsyncStorage.getItem('favMoviesList')
                .then(res => JSON.parse(res))
                .then(async (res) => {
                    console.log("RES", await this.existInFav(movie));
                    if (! await this.existInFav(movie)) {

                        res.push(movie)
                        AsyncStorage.setItem("favMoviesList", JSON.stringify(res))
                        alert("Movie Added to your Favourit Successfully");
                        this.setState({
                            movieInFav:true
                        })
                    } else {
                        alert("Sorry but this movie is already in your Fav List")
                    }
                }).catch(err => alert(err))
        } catch (error) {
            // Error saving data
            alert(error)
        }
    };

    // Share Path of movie poster
    onShare = async () => {
        try {
            const result = await Share.share({
                title: this.state.movie.title,
                url: "https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path,
                message: "https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path
            }, {
                    // Android only:
                    dialogTitle: 'Share Movie Poster',
                });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    render() {
        return (
            <>
                <ScrollView style={styles.contianer}>
                    <View>
                        <Image source={{ uri: "https://image.tmdb.org/t/p/original/" + this.state.movie.poster_path }}
                            style={styles.coverImg}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Left>
                            <View style={styles.moviePosterView} >
                                <Image style={styles.moviePoster}
                                    source={{ uri: "https://image.tmdb.org/t/p/original/" + this.state.movie.backdrop_path }} />
                            </View>
                        </Left>
                        <Right>
                            <TouchableOpacity
                                onPress={()=>this.addToFav(this.state.movie)}>
                                <Icon 
                                name={this.state.movieInFav?"heart":"heart-empty"} style={[styles.favIcon]} />
                            </TouchableOpacity>
                        </Right>
                    </View>

                    {/*Data */}

                    <Content padder>
                        <Text style={styles.movieTitle}>{this.state.movie.title} </Text>
                        <Item style={{ borderBottomWidth: 0 }}>
                            <Icon name="calendar" />
                            <Text>{this.state.movie.release_date}</Text>
                        </Item>
                        <Item style={styles.movieData}>
                            <Left>
                                <Icon name="star" style={[styles.Icon, { color: 'orange' }]} />
                                <Text style={{ color: "orange", fontWeight: 'bold' }}>{this.state.movie.vote_average}/10</Text>
                            </Left>
                            <Body>
                                <Icon name="eye" style={[styles.Icon, { color: '#0e95ad' }]} />
                                <Text style={{ color: "#0e95ad", fontWeight: 'bold' }}>{this.state.movie.popularity}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={this.onShare}>
                                    <Icon name="share" style={[styles.Icon, { color: '#db120b', alignSelf: 'center' }]} />
                                    <Text style={{ color: "#db120b", }}>Share Poster</Text>
                                </TouchableOpacity>
                            </Right>
                        </Item>
                        <View>
                            <Text style={styles.headLine}>
                                Overview
                        </Text>
                            <Text style={styles.overview}>
                                {this.state.movie.overview}
                            </Text>
                        </View>
                    </Content>


                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    contianer: {
        width: Width,
        height: Hight,
        backgroundColor: '#eee'
    },
    coverImg: {
        width: Width,
        height: 0.45 * Hight,
        resizeMode: 'cover',
    },
    moviePosterView: {
        marginTop: -0.2 * Hight,
        marginHorizontal: 0.03 * Width,
        backgroundColor: "rgba(0,0,0,0)",
        width: 0.45 * Width,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 23,
    },
    moviePoster: {
        width: 0.45 * Width,
        height: 0.35 * Hight,
        borderRadius: 15
    },
    favIcon: {
        marginRight: 0.03 * Width,
        color: 'red',
        fontSize: 40
    },
    Icon: {
        color: 'orange',
        fontSize: 40,
    },
    movieTitle: {
        color: "#000",
        fontFamily: "Roboto",
        fontSize: 30
    },
    movieData: {
        paddingVertical: 0.01 * Hight,
        paddingHorizontal: 0.1 * Width,
        marginTop: 0.05 * Hight,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    headLine: {
        fontSize: 24,
        color: '#000',
        fontFamily: 'Roboto',
        marginVertical: 0.05 * Hight
    },
    overview: {
        fontFamily: 'Lato-Light',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 0.06 * Hight
    }

})