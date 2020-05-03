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
import { styles } from "./styleSeries";
import { baseUrl, apiKey, mainColor } from "../../configs/global";
import ActorComp from "../../components/Actor/ActorComp";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import Carousel from "react-native-snap-carousel";

const { width: Width, height: Height } = Dimensions.get("window");

export default class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: this.props.navigation.getParam("series"),
      seriesInFav: false,
      actors: [],
      noCastAvailable: false
    };
   // console.log("wlcome in series");
    
  }

  componentDidMount = async () => {
    let m = await this.existInFav(this.state.series);
    this.setState({
      seriesInFav: m
    });
    this.getActors();
  };

  getActors = async () => {
    await fetch(
      `${baseUrl}/tv/${this.state.series.id}/credits?api_key=${apiKey}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(res => {
      //  console.log("Actors : ", res.cast);

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

  back = () => {
    this.props.navigation.goBack();
  };

  //check if seriess in Fav List
  existInFav = async series => {
    let stringList = await AsyncStorage.getItem("favSeriesList");
    let list = JSON.parse(stringList);

    for (let i = 0; i < list.length; i++) {
      if (JSON.stringify(series) === JSON.stringify(list[i])) return true;
    }
    return false;
  };

  // add series to favourits
  addToFav = async series => {
    try {
      AsyncStorage.getItem("favSeriesList")
        .then(res => JSON.parse(res))
        .then(async res => {
          //console.log("RES", await this.existInFav(series));
          if (!(await this.existInFav(series))) {
            res.push(series);
            AsyncStorage.setItem("favSeriesList", JSON.stringify(res));
            alert("Series Added to your Favourit Successfully");
            this.setState({
              seriesInFav: true
            });
          } else {
            alert("Sorry but this series is already in your Fav List");
          }
        })
        .catch(err => alert(err));
    } catch (error) {
      // Error saving data
      alert(error);
    }
  };

  // Share Path of series poster
  onShare = async () => {
    try {
      const result = await Share.share(
        {
          title: this.state.series.title,
          url:
            "https://image.tmdb.org/t/p/w500" + this.state.series.poster_path,
          message:
            "https://image.tmdb.org/t/p/w500" + this.state.series.poster_path
        },
        {
          // Android only:
          dialogTitle: "Share Series Poster"
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

  renderActors = actor => {
    return <ActorComp actor={actor.item} />;
  };

  render() {
    return (
      <>
        <ScrollView style={styles.contianer}>
          <View>
            <Image
              source={{
                uri:
                  "https://image.tmdb.org/t/p/original/" +
                  this.state.series.poster_path
              }}
              style={styles.coverImg}
              resizeMode="stretch"
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Left>
              <View style={styles.seriesPosterView}>
                <Image
                  style={styles.seriesPoster}
                  source={
                    this.state.series.backdrop_path ? 
                    {
                    uri:
                      "https://image.tmdb.org/t/p/original/" +
                      this.state.series.backdrop_path
                  }
                : require('../../../assets/images/movie.png')
                }
                  imageStyle={styles.seriesPoster}
                  indicator={Progress.Bar}
                  indicatorProps={{
                    borderWidth: 0,
                    color: mainColor,
                    unfilledColor: "rgba(200, 200, 200, 0.2)"
                  }}
                  resizeMode={this.state.series.backdrop_path ? 'cover' : 'contain'}
                />
              </View>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() => this.addToFav(this.state.series)}
              >
                <Icon
                  name={this.state.seriesInFav ? "heart" : "heart-empty"}
                  style={[styles.favIcon]}
                />
              </TouchableOpacity>
            </Right>
          </View>

          {/*Data */}

          <Content padder>
            <Text style={styles.seriesTitle}>
              {this.state.series.original_name}{" "}
            </Text>
            <Item style={{ borderBottomWidth: 0 }}>
              <Icon name="calendar" />
              <Text>{this.state.series.first_air_date}</Text>
            </Item>
            <Item style={styles.seriesData}>
              <View style={styles.iconCont}>
                <Icon name="star" style={[styles.Icon, { color: "orange" }]} />
                <Text style={{ color: "orange", fontWeight: "bold" }}>
                  {this.state.series.vote_average}/10
                </Text>
              </View>
              <View style={styles.iconCont}>
                <Icon name="eye" style={[styles.Icon, { color: "#0e95ad" }]} />
                <Text style={{ color: "#0e95ad", fontWeight: "bold" }}>
                  {this.state.series.popularity}
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
            </Item>
            <View>
              <Text style={styles.headLine}>Overview</Text>
              <Text style={styles.overview}>{this.state.series.overview}</Text>
            </View>

            <View>
              <Text style={styles.headLine}>Cast</Text>
              {this.state.noCastAvailable ? (
                <Text style={styles.overview}>
                  Sorry But there is No Available Cast For This Series
                </Text>
              ) : this.state.actors.length > 0 ? (
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
        </ScrollView>
      </>
    );
  }
}