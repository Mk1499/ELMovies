import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Share,
  AsyncStorage
} from "react-native";
import { Item, Icon, Left, Body, Right, Content, CardItem } from "native-base";
import { styles } from "./style";
import { baseUrl, apiKey, mainColor } from "../../configs/global";
import ActorComp from "../../components/Actor/ActorComp";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import Carousel from "react-native-snap-carousel";
import {YouTubeStandaloneAndroid} from 'react-native-youtube'
 
const { width: Width, height: Height } = Dimensions.get("window");



export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.navigation.getParam("movie"),
      movieInFav: false,
      actors: [],
      noCastAvailable: false, 
      trailerID:""
    };
  }

  componentDidMount = async () => {
    let m = await this.existInFav(this.state.movie);
    this.setState({
      movieInFav: m
    });
    this.getActors().then(() => this.getTrailerID())
  };

  getActors = async () => {
    await fetch(
      `${baseUrl}/movie/${this.state.movie.id}/credits?api_key=${apiKey}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(res => {
        // console.log("Actors : ", res.cast);

        this.setState({
          actors: res.cast ? res.cast.slice(0, 5) : []
        });

        return res.cast.slice(0, 4);
      })
      .catch(err => {
        this.setState({
          noCastAvailable: true
        });
        //  console.log(err);
      });
  };

  getTrailerID = async () => {
    await fetch(`${baseUrl}/movie/${this.state.movie.id}/videos?api_key=${apiKey}&language=en-US&page=1`)
    .then(res => res.json())
    .then(res => {
      
      this.setState({
        trailerID: res.results[0].key
      })
    })
  
  }


  back = () => {
    this.props.navigation.goBack();
  };

  renderActors = actor => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.gotToActorProfile(actor.item);
        }}
        activeOpacity={1}
      >
        <ActorComp actor={actor.item} />
      </TouchableOpacity>
    );
  };

  //check if movies in Fav List
  existInFav = async movie => {
    let stringList = await AsyncStorage.getItem("favMoviesList");
    let list = JSON.parse(stringList);

    for (let i = 0; i < list.length; i++) {
      if (JSON.stringify(movie) === JSON.stringify(list[i])) return true;
    }
    return false;
  };

  // add movie to favourits
  addToFav = async movie => {
    try {
      AsyncStorage.getItem("favMoviesList")
        .then(res => JSON.parse(res))
        .then(async res => {
          //console.log("RES", await this.existInFav(movie));
          if (!(await this.existInFav(movie))) {
            res.push(movie);
            AsyncStorage.setItem("favMoviesList", JSON.stringify(res));
            alert("Movie Added to your Favourit Successfully");
            this.setState({
              movieInFav: true
            });
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

  // Share Path of movie poster
  onShare = async () => {
    try {
      const result = await Share.share(
        {
          title: this.state.movie.title,
          url: "https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path,
          message:
            "https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path
        },
        {
          // Android only:
          dialogTitle: "Share Movie Poster"
        }
      );

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

  gotToActorProfile = actor => {
    this.props.navigation.replace("ActorProfile", { actor });
  };

  playTrailer = async () => {
    if (this.state.trailerID){

      YouTubeStandaloneAndroid.playVideo({
        apiKey: 'AIzaSyAaHgdfhvZCfUllngP3lVM7Gbtnybsj-O4', // Your YouTube Developer API Key
        videoId: this.state.trailerID, // YouTube video ID
        autoplay: true, // Autoplay the video
        startTime: 0, // Starting point of video (in seconds)
      })
      .then(() => console.log('Standalone Player Exited'))
      .catch(errorMessage => console.error(errorMessage));
    }else {
      alert("Sorry But This movie trailer unavailble")
    }
  }




  render() {
    return (
      <>
        <ScrollView style={styles.contianer}>
          <View>
            <Image
              source={
                this.state.movie.poster_path
                  ? {
                      uri:
                        "https://image.tmdb.org/t/p/original/" +
                        this.state.movie.poster_path
                    }
                  : require("../../../assets/images/defaultMovie.jpg")
              }
              style={styles.coverImg}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.movieDataView}>
            <View style={{ flexDirection: "row" }}>
              {/* <Left>
              <View style={styles.moviePosterView}>
                <Image
                  style={styles.moviePoster}
                  source={
                    this.state.movie.backdrop_path ||
                    this.state.movie.poster_path
                      ? {
                          uri: this.state.movie.backdrop_path
                            ? "https://image.tmdb.org/t/p/original/" +
                              this.state.movie.backdrop_path
                            : "https://image.tmdb.org/t/p/original/" +
                              this.state.movie.poster_path
                        }
                      : require("../../../assets/images/defaultMovie.jpg")
                  }
                  imageStyle={styles.moviePoster}
                  indicator={Progress.Bar}
                  indicatorProps={{
                    borderWidth: 0,
                    color: mainColor,
                    unfilledColor: "rgba(200, 200, 200, 0.2)"
                  }}
                  resizeMode={
                    this.state.movie.backdrop_path ? "cover" : "contain"
                  }
                />
              </View>
            </Left> */}
              <Right style={styles.playIcon}>
                <TouchableOpacity
                  onPress={this.playTrailer}
                >
                  <Icon name="play" style={[styles.favIcon]} />
                </TouchableOpacity>
              </Right>
            </View>

            {/*Data */}

            <Content padder>
              <Text style={styles.movieTitle}>{this.state.movie.title} </Text>
              <Item style={{ borderBottomWidth: 0 }}>
                <Icon name="calendar" style={styles.dateText} />
                <Text style={styles.dateText}>
                  {this.state.movie.release_date}
                </Text>
              </Item>
              <View style={styles.movieData}>
                <View style={styles.iconCont}>
                  <Icon
                    name="star"
                    style={[styles.Icon, { color: "orange" }]}
                  />
                  <Text style={{ color: "orange", fontWeight: "bold" }}>
                    {this.state.movie.vote_average}/10
                  </Text>
                </View>
                <View style={styles.iconCont}>
                  <Icon
                    name="eye"
                    style={[styles.Icon, { color: "#0e95ad" }]}
                  />
                  <Text style={{ color: "#0e95ad", fontWeight: "bold" }}>
                    {this.state.movie.popularity}
                  </Text>
                </View>
                <View style={styles.iconCont}>
                  <TouchableOpacity onPress={this.onShare}>
                    <Icon
                      name="share"
                      style={[
                        styles.Icon,
                        { color: "#db120b", alignSelf: "center" }
                      ]}
                    />
                    <Text style={{ color: "#db120b" }}>Share Poster</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.headLine}>Overview</Text>
                <Text style={styles.overview}>{this.state.movie.overview}</Text>
              </View>

              <View>
                <Text style={styles.headLine}>Cast</Text>
                {this.state.noCastAvailable ? (
                  <Text style={styles.overview}>
                    Sorry But there is No Available Cast For This Movie
                  </Text>
                ) : this.state.actors.length ? (
                  <Carousel
                    ref={c => {
                      this._carousel = c;
                    }}
                    data={this.state.actors}
                    renderItem={this.renderActors}
                    sliderWidth={0.9 * Width}
                    itemWidth={0.5 * Width}
                    layout={"default"}
                  />
                ) : (
                  <ActivityIndicator size="large" color={mainColor} />
                )}
              </View>
            </Content>
          </View>
        </ScrollView>
      </>
    );
  }
}
