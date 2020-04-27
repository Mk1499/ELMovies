import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator,AsyncStorage,TouchableWithoutFeedback } from 'react-native';
import { Item, Left, Content, Container, Header } from 'native-base';

import BigMovie from '../../components/BigMovie/BigMovie'

// import External Style
import commStyle from '../commStyle';

const { width: Width, height: Height } = Dimensions.get("window")

const apiKey = "bf80873db6ac2774e205169ad61a86d2";

const baseUrl = "https://api.themoviedb.org/3/search/movie";

export default class SearchRes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieName: this.props.navigation.getParam('movieName'),
            moviesList: [],
            searchDone: false
        }
        console.log(`${baseUrl}?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${this.state.movieName}`);
    }

    componentDidMount() {
        fetch(`${baseUrl}?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${this.state.movieName}`)
            .then(res => res.json())
            .then(res => {
                if (res.results.length > 0)
                    this.setState({
                        moviesList: res.results,
                    })
                else
                    this.setState({
                        searchDone: true
                    })
            }).catch(err => console.log("Err : ",err)
            )
    }

    // Movie Pressed
    gotoMovieScreen = (movie) => {
        this.props.navigation.navigate('Movie', { movie })
    }

 //check if movies in Fav List 
 existInFav =  async (movie)=> {
    let stringList = await AsyncStorage.getItem('favMoviesList');
    let list = JSON.parse(stringList);

    for (let i=0 ; i<list.length ; i++){
        if (JSON.stringify(movie) == JSON.stringify(list[i]) )
            return true ; 
    }
    return false ;
    
}

// add movie to favourits 
addToFav = async (movie)=> {
    try {
          AsyncStorage.getItem('favMoviesList')
          .then(res => JSON.parse(res))
          .then( async (res) => {
              console.log("RES",await this.existInFav(movie));
              if (! await this.existInFav(movie)){

                  res.push(movie)
                  AsyncStorage.setItem("favMoviesList",JSON.stringify (res))
                  alert("Movie Added to your Favourit Successfully")
                }else {
                    alert ("Sorry but this movie is already in your Fav List")
                }
            }).catch(err => alert(err))
      } catch (error) {
        // Error saving data
        alert(error)
      }
    };
        
    render() {
        return (
            <Container style={commStyle.container}>

                <Content padder>

                    <Item style={{ borderBottomWidth: 0 }}>
                        <Left style={styles.rowView}>
                            <Text style={styles.headLine}>
                                Search Results for :
                            </Text>
                            <Text style={[styles.headLine, { color: "gold" }]}> {this.state.movieName}</Text>
                        </Left>
                    </Item>
                    {this.state.moviesList.length > 0 && !this.state.searchDone ?
                        this.state.moviesList.map(movie =>
                            <TouchableWithoutFeedback key={movie.id} onPress={() => this.gotoMovieScreen(movie)}>
                                <BigMovie movie={movie} addToFav ={()=>this.addToFav(movie)}/>
                            </TouchableWithoutFeedback
                            >
                        )
                        : this.state.searchDone ?
                            <View style={[styles.rowView, styles.notFound]}>
                                <Text style={styles.headLine}>Sorry no available movies for</Text>
                                <Text style={[styles.headLine, { color: "gold" }]}> {this.state.movieName}</Text>
                            </View> :
                            <View style={styles.notFound}>
                                <ActivityIndicator color="gold" size='large' />
                            </View>}
                </Content>
            </Container>
        )
    }
}


const styles = StyleSheet.create({

    headLine: {
        fontSize: 24,
        color: '#333',
        fontFamily: 'Lato-Light',
        marginBottom: 0.06 * Height
    },
    rowView: {
        flexDirection: 'row'
    },
    notFound: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.8 * Height
    }
})