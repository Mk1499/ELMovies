import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { Item, Left, Content, Container, Header } from 'native-base';

import FavMovie from '../../components/FavMovie/FavMovie';
import {connect} from 'react-redux';

// import External Style
import commStyle from '../commStyle';
import {styles} from './style'

const { width: Width, height: Height } = Dimensions.get("window")

 class FavMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favMoviesList: []
        }
    }

    componentDidMount() {

        this.fetchFavMovies();

        // add Focus listener 
        this.props.navigation.addListener('didFocus', () => {
            // The screen is focused
            // Call any action
            this.fetchFavMovies();

        });
    }

    fetchFavMovies = () => {
        AsyncStorage.getItem('favMoviesList')
            .then(res => JSON.parse(res))
            .then(favMoviesList => this.setState({ favMoviesList }))
    }

    // Movie Pressed
    gotoMovieScreen = (movie) => {
        this.props.navigation.navigate('Movie', { movie })
    }

    render() {
        return (
            <Container style={commStyle.container}>
                <Content padder>

                    <Item style={{ borderBottomWidth: 0 }}>
                        <Left>
                            <Text style={styles.headLine}>
                                Your Favourite Movies
                            </Text>
                        </Left>
                    </Item>
                    <ScrollView>
                        {this.state.favMoviesList.length > 0 ?
                            this.state.favMoviesList.map(movie =>
                                <TouchableOpacity
                                onPress={() => this.gotoMovieScreen(movie)}
                                key={movie.id}>
                                    <FavMovie movie={movie} />
                                </TouchableOpacity>
                            )
                            : <Content padder contentContainerStyle={styles.noMoviesCont}>

                                    <Text style={{color:'grey'}}>
                                        Sorry No Favourite Movies Recorded
                                    </Text>
                                
                                </Content>}
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{})(FavMovies);