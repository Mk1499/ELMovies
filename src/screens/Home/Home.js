import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Container, Item, Form, Input, Label, Icon, Left } from "native-base";

import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";

import {
  getNowPlayingMovies,
  getPopularMovies,
  addToFav,
  intializeFav
} from "../../actions/movie";

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
        <View style={styles.section}>
          <Form>
            <Label style={styles.label}>Search</Label>
            <Item style={{ borderBottomColor: "grey" }}>
              <Input
                placeholder="Search for movie here"
                style={styles.searchInput}
                placeholderStyle={styles.placeholder}
                onChangeText={m => this.setState({ searchMovie: m })}
              />
              <TouchableOpacity onPress={this.gotoSearchRes}>
                <Icon name="search" style={{ color: "grey" }} />
              </TouchableOpacity>
            </Item>
          </Form>
        </View>
        <ScrollView>
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
                <ActivityIndicator color="gold" size="large" />
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
                <ActivityIndicator color="gold" size="large" />
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

// Styling
const styles = StyleSheet.create({
  label: {
    color: "grey",
    fontWeight: "100",
    fontFamily: "Lato-Light"
  },
  searchInput: {
    height: 0.1 * Height,
    fontSize: 24,
    width: Width,
    fontFamily: "Lato-Light",
    color: "#333"
  },
  headLine: {
    fontSize: 24,
    color: "#333",
    fontFamily: "Lato-Light",
    marginBottom: 0.06 * Height
  },
  section: {
    paddingHorizontal: 0.05 * Width,
    marginVertical: 0.05 * Width
  },
  nowPlayingMovies: {
    height: 0.3 * Height,
    alignItems: "center",
    justifyContent: "center"
  }
});
