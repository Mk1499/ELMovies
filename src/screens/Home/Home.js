import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Container, Item, Form, Input, Label, Icon, Left } from "native-base";
import {styles} from './style'

import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";

import {
  getNowPlayingMovies,
  getPopularMovies,
  addToFav,
  intializeFav
} from "../../actions/movie";
import {mainColor} from '../../configs/global'; 

// import External Style
import commStyle from "../commStyle";

// Import Components
import SmallMovie from "../../components/SmallMovie/SmallMovie";
import BigMovie from "../../components/BigMovie/BigMovie";
import { async } from "rxjs/internal/scheduler/async";

const { width: Width, height: Height } = Dimensions.get("window");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMovie: "",
      popularMovies: [],
      popularMoviesDone: false,
      nowPlayingMovies: [],
      nowPlayingMoviesDone: false
    };
  }

  componentDidMount = async () => {
    console.log("Props : ", this.props);

    this.props.getPopularMovies();
    this.props.getNowPlayingMovies();
    this.props.intializeFav();
    SplashScreen.hide();
  };

  // Search Button Pressed
  gotoSearchRes = () => {
    if (this.state.searchMovie)
      this.props.navigation.navigate("SearchRes", {
        movieName: this.state.searchMovie
      });
    else alert("Please Write Movie name");
  };

  // Movie Pressed
  gotoMovieScreen = movie => {
    this.props.navigation.navigate("Movie", { movie });
  };


  render() {
    return (
      <Container style={commStyle.container}>
        {/* Search Input Feild */}
        <View style={styles.searchView}>
          <Form style={styles.searchForm}>
            <Item>
              <Input
                placeholder="Search for movie here"
                style={styles.searchInput}
                placeholderStyle={styles.placeholder}
                onChangeText={m => this.setState({ searchMovie: m })}
                onSubmitEditing={this.gotoSearchRes}
              />
              <TouchableOpacity onPress={this.gotoSearchRes}>
                <Icon name="search" style={{ color: mainColor }} />
              </TouchableOpacity>
            </Item>
          </Form>
        </View>
        <ScrollView contentContainerStyle={styles.scrollVeiwCont}>
          {/* Recent Movies */}
          <View style={styles.section}>
            <Item style={{ borderBottomWidth: 0 }}>
              <Left>
                <Text style={styles.headLine}>Now Playing</Text>
              </Left>
            </Item>
            {this.props.movies.nowPlayingMovies.length > 0 &&
            this.props.movies.nowPlayingMoviesDone ? (
              <ScrollView horizontal={true}>
                {this.props.movies.nowPlayingMovies.map(movie => (
                  <TouchableOpacity
                    onPress={() => this.gotoMovieScreen(movie)}
                    key={movie.id}
                  >
                    <SmallMovie movie={movie} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.nowPlayingMovies}>
                <ActivityIndicator color={mainColor} size="large" />
              </View>
            )}
          </View>

          {/* Popular */}
          <View style={styles.section}>
            <Item style={{ borderBottomWidth: 0 }}>
              <Left>
                <Text style={styles.headLine}>Popular</Text>
              </Left>
            </Item>
            {this.props.movies.popularMovies.length > 0 &&
            this.props.movies.popularMoviesDone ? (
              this.props.movies.popularMovies.map(movie => (
                <TouchableOpacity
                  onPress={() => this.gotoMovieScreen(movie)}
                  key={movie.id}
                >
                  <BigMovie
                    movie={movie}
                    addToFav={() => this.props.addToFav(movie)}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.popularMovies}>
                <ActivityIndicator color={mainColor} size="large" />
              </View>
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps, {
  getPopularMovies,
  getNowPlayingMovies,
  addToFav,
  intializeFav
})(Home);

