import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  TouchableWithoutFeedback
} from "react-native";
import { Item, Left, Content, Container, Header } from "native-base";
import {mainColor} from '../../configs/global';
import BigMovie from "../../components/BigMovie/BigMovie";
import { apiKey, baseUrl } from "../../configs/global";
import { connect } from "react-redux";
import { styles } from "./style";

// import External Style
import commStyle from "../commStyle";

class SearchRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: this.props.navigation.getParam("movieName"),
      moviesList: [],
      searchDone: false
    };
    console.log(
      `${baseUrl}?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${this.state.movieName}`
    );
  }

  componentDidMount() {
    fetch(
      `${baseUrl}/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${this.state.movieName}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0)
          this.setState({
            moviesList: res.results
          });
        else
          this.setState({
            searchDone: true
          });
      })
      .catch(err => console.log("Err : ", err));
  }

  // Movie Pressed
  gotoMovieScreen = movie => {
    this.props.navigation.navigate("Movie", { movie });
  };

  //check if movies in Fav List
  existInFav = async movie => {
    let stringList = await AsyncStorage.getItem("favMoviesList");
    let list = JSON.parse(stringList);

    for (let i = 0; i < list.length; i++) {
      if (JSON.stringify(movie) == JSON.stringify(list[i])) return true;
    }
    return false;
  };

  // add movie to favourits
  addToFav = async movie => {
    try {
      AsyncStorage.getItem("favMoviesList")
        .then(res => JSON.parse(res))
        .then(async res => {
          console.log("RES", await this.existInFav(movie));
          if (!(await this.existInFav(movie))) {
            res.push(movie);
            AsyncStorage.setItem("favMoviesList", JSON.stringify(res));
            alert("Movie Added to your Favourit Successfully");
          } else {
            alert("Sorry but this movie is already in your Fav List");
          }
        })
        .catch(err => alert(err));
    } catch (error) {
      // Error saving data
      alert(error);
    }
  };

  render() {
    return (
      <Container style={commStyle.container}>
        <Content padder>
          <Item style={{ borderBottomWidth: 0 }}>
            <Left style={styles.rowView}>
              <Text style={styles.headLine}>Search Results for :</Text>
              <Text style={[styles.headLine, {color: mainColor,fontWeight:'bold'}]}>
                {" "}
                {this.state.movieName}
              </Text>
            </Left>
          </Item>
          {this.state.moviesList.length > 0 && !this.state.searchDone ? (
            this.state.moviesList.map(movie => (
              <TouchableWithoutFeedback
                key={movie.id}
                onPress={() => this.gotoMovieScreen(movie)}
              >
                <BigMovie movie={movie} addToFav={() => this.addToFav(movie)} />
              </TouchableWithoutFeedback>
            ))
          ) : this.state.searchDone ? (
            <View style={[styles.rowView, styles.notFound]}>
              <Text style={styles.notFoundLine}>Sorry no available movies for</Text>
              <Text style={[styles.notFoundLine,{color:mainColor,fontWeight:'bold'}]}>
                {" "}
                {this.state.movieName}
              </Text>
            </View>
          ) : (
            <View style={styles.notFound}>
              <ActivityIndicator color={mainColor} size="large" />
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(SearchRes);
