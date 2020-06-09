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
import { Item, Left, Content, Container, Header, Icon } from "native-base";
import { mainColor, textColor } from "../../configs/global";
import BigMovie from "../../components/BigMovie/BigMovie";
import { apiKey, baseUrl } from "../../configs/global";
import { connect } from "react-redux";
import { styles } from "./style";
import { RNToasty } from 'react-native-toasty';

// import External Style
import commStyle from "../commStyle";

class SearchRes extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      mediaName: "",
      mediaList: [],
      searchDone: false,
      movieTvSW: "movie"
    };

    // this.props.navigation.setParam({headerTitle:"jcdnsjncd"})
  }
  componentDidMount() {
    if (this.props.navigation.getParam("movieName")) {
      this.setState(
        {
          mediaName: this.props.navigation.getParam("movieName"),
          movieTvSW: "movie"
        },
        () => this.getMedia()
      );
    } else {
      this.setState(
        {
          mediaName: this.props.navigation.getParam("seriesName"),
          movieTvSW: "tv"
        },
        () => this.getMedia()
      );
    }
  }

  getMedia = async () => {
   // console.log(
    //   `${baseUrl}/search/${this.state.movieTvSW}?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${this.state.mediaName}`
    // );
    fetch(
      `${baseUrl}/search/${this.state.movieTvSW}?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${this.state.mediaName}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0)
          this.setState({
            mediaList: res.results
          });
        else
          this.setState({
            searchDone: true
          });
      })
      .catch(err => console.log("Err : ", err));
  };
  // Movie Pressed
  gotoMovieScreen = media => {
    //console.log("Media : ", media);
    
    if (this.state.movieTvSW == "movie")
      this.props.navigation.navigate("Movie", { movie : media });
    else this.props.navigation.navigate("Series", { series : media });
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
        //  console.log("RES", await this.existInFav(movie));
          if (!(await this.existInFav(movie))) {
            res.push(movie);
            AsyncStorage.setItem("favMoviesList", JSON.stringify(res));
            RNToasty.Success({
              title:"Movie Added to your Favourit Successfully"
            })
            
          } else {
            RNToasty.Error({
              title:"Sorry but this movie is already in your Fav List"
            })
          }
        })
        .catch(err =>
            RNToasty.Error({
              title:err
            })
          );
    } catch (error) {
      // Error saving data
      // alert(error);
      RNToasty.Error({
        title:error
      })
    }
  };

  render() {
    return (
      <Container style={commStyle.container}>
          <Item style={{ borderBottomWidth: 0,backgroundColor:mainColor,justifyContent:'center' }}>
            <Left style={styles.rowView}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Icon name="arrowleft" type="AntDesign" style={styles.backIcon}/>
              </TouchableOpacity>
              <Text style={styles.headLine}>Search Results for :</Text>
              <Text
                style={[
                  styles.headLine,
                  { color: textColor, fontWeight: "bold" }
                ]}
              >
                {" "}
                {this.state.mediaName}
              </Text>
            </Left>
          </Item>
        <Content padder>
          {this.state.mediaList.length > 0 && !this.state.searchDone ? (
            this.state.mediaList.map(movie => (
              <TouchableOpacity
                key={movie.id}
                onPress={() => this.gotoMovieScreen(movie)}
              >
                <BigMovie movie={movie} addToFav={() => this.addToFav(movie)} />
              </TouchableOpacity>
            ))
          ) : this.state.searchDone ? (
            <View style={[styles.rowView, styles.notFound]}>
              <Text style={styles.notFoundLine}>
                Sorry no available {this.state.movieTvSW} for
              </Text>
              <Text
                style={[
                  styles.notFoundLine,
                  { color: mainColor, fontWeight: "bold" }
                ]}
              >
                {" "}
                {this.state.mediaName}
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
