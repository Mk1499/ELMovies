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
import { baseUrl, apiKey, mainColor , textColor} from "../../configs/global";
import ActorComp from "../../components/Actor/ActorComp";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import Carousel from "react-native-snap-carousel";
import {YouTubeStandaloneAndroid} from 'react-native-youtube';
import { RNToasty } from 'react-native-toasty';
import { addMovieToWatchList} from '../../actions/watchList'; 
import {connect} from "react-redux"; 

const { width: Width, height: Height } = Dimensions.get("window");

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: this.props.navigation.getParam("series"),
      seriesInList: false,
      actors: [],
      noCastAvailable: false
    };
   // console.log("wlcome in series");
    
  }

  componentDidMount = async () => {

    this.getActors().then(()=>this.checkSerInWL()).then(()=>this.getTrailerID())
  };


  checkSerInWL = ()=> {
    console.log("Movies WL : ", this.props.seriesWL);
    this.props.seriesWL.map( m => {
      if (m.mediaid === this.state.series.id){
        this.setState({
          seriesInList:true
        })
        
      }
    })
  }


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

  getTrailerID = async () => {
    await fetch(`${baseUrl}/tv/${this.state.series.id}/videos?api_key=${apiKey}&language=en-US&page=1`)
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
  // add movie to favourits
  addToList = async () => {
    this.setState({
            seriesInList: true
          });
     this.props.addMovieToWatchList(this.state.series,"series");    

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
            "https://image.tmdb.org/t/p/w500" + this.state.series.poster_path,
          type:"image/jpeg"
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
      RNToasty.Error({
        title:error.message
      })
      // alert(error.message);
    }
  };

  gotToActorProfile = (actor) => {
    this.props.navigation.replace("ActorProfile",{actor})
  }

  renderActors = actor => {
    return (
      <TouchableOpacity onPress={()=>{this.gotToActorProfile(actor.item)}} activeOpacity={1} >
        <ActorComp actor={actor.item} />
      </TouchableOpacity>
    );
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
      RNToasty.Error({
        title:"Sorry But This movie trailer unavailble"
      })
    }
  }
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
                    this.state.series.backdrop_path || this.state.series.poster_path ?  
                    {
                      uri: this.state.series.backdrop_path
                        ? "https://image.tmdb.org/t/p/original/" +
                          this.state.series.backdrop_path
                        : "https://image.tmdb.org/t/p/original/" +
                          this.state.series.poster_path
                    }
                    : require("../../../assets/images/defaultMovie.jpg")
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
                onPress={this.playTrailer}
              >
                <Icon
                  name="play"
                  style={[styles.favIcon]}
                />
              </TouchableOpacity>
            </Right>
          </View>

          {/*Data */}

          <Content padder>
            <Text style={styles.seriesTitle}>
              {this.state.series.original_name || this.state.series.name }
            </Text>
            <Item style={{ borderBottomWidth: 0 }}>
              <Icon name="calendar" style={{color:textColor}}/>
              <Text style={styles.seriesDate}>{this.state.series.first_air_date || "N/A"}</Text>
            </Item>
            <View style={styles.seriesData}>
              <View style={styles.iconCont}>
                <Icon name="star" style={[styles.Icon, { color: "orange" }]} />
                <Text style={{ color: "orange", fontWeight: "bold" }}>
                  {this.state.series.vote_average}/10
                </Text>
              </View>
              <View style={styles.iconCont}>
                  <TouchableOpacity onPress={this.onShare}>
                    <Icon
                      name="share"
                      style={[
                        styles.Icon,
                        { color: "#0e95ad", alignSelf: "center" }
                      ]}
                    />
                    <Text style={{ color: "#0e95ad" }}>Share Poster</Text>
                  </TouchableOpacity>
                </View>
              <View style={styles.iconCont}>
                <TouchableOpacity onPress={this.addToList}>
                  <Icon
                    name={this.state.seriesInList ? "playlist-check" : "playlist-plus"}
                    style={[
                      styles.Icon,
                      { color: "#db120b", alignSelf: "center" }
                    ]}
                    type="MaterialCommunityIcons"
                  />
                  <Text style={{ color: "#db120b" }}>{this.state.seriesInList ? "Added to List" : "Add to List"}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.headLine}>Overview</Text>
              <Text style={styles.overview}>{this.state.series.overview || `Sorry there no averview available for ${this.state.series.original_name}`}</Text>
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

const mapStateToProps = state => ({
  seriesWL : state.wlist.seriesWL

}); 

export default connect(mapStateToProps,{addMovieToWatchList})(Series);