import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated
} from "react-native";
import { Icon, Left, Right } from "native-base";
import SmallMovie from "../../components/SmallMovie/SmallMovie";
import { baseUrl, apiKey, mainColor,bgColor, textColor } from "../../configs/global";
import styles, { animation, animatedHeight } from "./style";

const { width, height } = Dimensions.get("screen");

export default class ActorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: this.props.navigation.getParam("actor"),
      popularity: "",
      placeOfBirth: "",
      biography: "",
      known_for_department: "",
      movies: [],
      series: [],
      scrollableUp: true,
      scrollableDown: false,
      moreIconName: "up",
      scrollable: false
    };
    this.getBasicData();
  }

  componentDidMount() {
    this.getActorMovies().then(() => this.getActorSeries());
  }

  moveDetails = () => {
    // move up
    if (this.state.scrollableUp) {
      this.setState({
        scrollableDown: true,
        scrollableUp: false,
        moreIconName: "down",
        scrollable: true
      });
      Animated.spring(animation.y, {
        toValue: -0.4 * height,
        tension: 0.5
      }).start();
    } else if (this.state.scrollableDown) {
      this.setState({
        scrollableDown: false,
        scrollableUp: true,
        moreIconName: "up",
        scrollable: false
      });
      Animated.spring(animation.y, {
        toValue: 0 * height,
        tension: 0.5
      }).start();
    }
  };

  getBasicData = async () => {
    Animated.spring(animation.y, {
      toValue: 0 * height,
      tension: 0.5
    }).start();
    await fetch(`${baseUrl}/person/${this.state.actor.id}?api_key=${apiKey}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          popularity: res.popularity,
          placeOfBirth: res.place_of_birth,
          biography: res.biography,
          known_for_department: res.known_for_department
        });
      })
      .catch(err => console.log("Error while fetch actor data : ", err));
  };

  getActorMovies = async () => {
    await fetch(
      `${baseUrl}/person/${this.state.actor.id}/movie_credits?api_key=${apiKey}`
    )
      .then(res => res.json())
      .then(res => {
        console.log("RES :", res);

        this.setState({
          movies: res.cast.slice(0, 5)
        });
      })
      .catch(err => console.log("Error while fetch all actor data : ", err));
  };

  getActorSeries = async () => {
    await fetch(
      `${baseUrl}/person/${this.state.actor.id}/tv_credits?api_key=${apiKey}`
    )
      .then(res => res.json())
      .then(res => {
        console.log("RES :", res);

        this.setState({
          series: res.cast.slice(0, 5)
        });
      })
      .catch(err => console.log("Error while fetch all actor data : ", err));
  };

  // Movie Pressed
  gotoMovieScreen = (media, type) => {
    this.props.navigation.replace(type, { movie: media, series: media });
  };

  renderWork = ({ item }, type) => {
    // console.log("M :",movie);

    return (
      <TouchableOpacity
        onPress={() => {
          this.gotoMovieScreen(item, type);
        }}
        activeOpacity={1}
      >
        <SmallMovie movie={item} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View >
        <Image
          style={{
            width,
            height: 0.5 * height
          }}
          source={{
            uri:
              "https://image.tmdb.org/t/p/original/" +
              this.state.actor.profile_path
          }}
        />
        <Animated.View style={[styles.mainView, animatedHeight]}>
          <View style={{ flexDirection: "row" }}>
            <Left>
              <Text style={styles.actorName}>{this.state.actor.name}</Text>
              <Text style={styles.note}>{this.state.known_for_department}</Text>
            </Left>
            <Right>
              <TouchableOpacity
                style={styles.upDownBtn}
                onPress={this.moveDetails}
              >
                <Icon
                  name={this.state.moreIconName}
                  type="AntDesign"
                  style={{ color: mainColor }}
                />
              </TouchableOpacity>
            </Right>
          </View>
          <ScrollView
            scrollEnabled={this.state.scrollable}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginVertical: 0.05 * height }}>
              <Text style={styles.sectionTitle}>Biography</Text>
              <Text
                numberOfLines={5}
                ellipsizeMode="tail"
                style={{ textAlign: "center",color:textColor }}
              >
                {this.state.biography  || `Sorry There is available Bio for ${this.state.actor.name}`}
              </Text>
            </View>

            <View
              style={{
                marginTop: 0.05 * height,
                flexDirection: "row"
              }}
            >
              <View style={styles.iconMainView}>
                <View style={styles.iconView}>
                  <Icon name="trending-up" style={{ color: mainColor }} />
                </View>
                <Text style={styles.iconText}>{this.state.popularity|| "N/A"}</Text>
              </View>
              <View style={styles.iconMainView}>
                <View style={styles.iconView}>
                  <Icon
                    name="flag"
                    style={{ color: mainColor }}
                    type="FontAwesome"
                  />
                </View>
                <Text style={styles.iconText}>{this.state.placeOfBirth || "N/A"}</Text>
              </View>
            </View>
            {this.state.movies.length ? (
              <View
                style={{
                  marginTop: 0.05 * height
                }}
              >
                <Text style={styles.sectionTitle}>Movies</Text>
                <FlatList
                  horizontal={true}
                  data={this.state.movies}
                  renderItem={item => this.renderWork(item, "Movie")}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ) : null}
            {this.state.series.length ? (
              <View
                style={{
                  marginTop: 0.05 * height
                }}
              >
                <Text style={styles.sectionTitle}>Series</Text>
                <FlatList
                  horizontal={true}
                  data={this.state.series}
                  renderItem={item => this.renderWork(item, "Series")}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ) : null}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  componentWillUnmount(){
    
  }
}
