import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Dimensions,
  RefreshControl
} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import { Icon, Left, Radio, Right, Item, CardItem } from "native-base";
import { WEB_CLIENT_ID } from "../../configs/keys";
import { customBaseUrl } from "../../configs/global";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-community/google-signin";
import { googleLogout } from "../../actions/auth";
import { mainColor, textColor, bgColor } from "../../configs/global";
import SmallMovie from "../../components/SmallMovie/SmallMovie";
import Carousel from "react-native-snap-carousel";
import {getList} from '../../actions/watchList';
const { width: Width, height: Height } = Dimensions.get("window");

class userProfile extends Component {
  constructor(props) {
    super(props);
    console.log("User Info2 : ", this.props.userInfo);
    this.state = {
      darkMode: true,
      loadList: this.props.loadList,
      moviesList: [],
      seriesList: []
    };
  }

  componentDidMount = async() => {
   await this.props.getList();
    console.log("P : ", this.props.moviesList);
    
    // this.props.navigation.addListener("didFocus", async () => {
      
    // });
  }

  logOut = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      this.props.googleLogout();
    } else {
      await AsyncStorage.setItem("MLuserInfo", "");
    }

    this.props.navigation.replace("Splash");
  };

  renderSmallMovie = (movie, index) => {
    console.log("Mov : ", movie);

    return (
      <TouchableOpacity
        onPress={() => this.gotoMovieScreen(movie.item)}
        key={movie.item.id}
        activeOpacity={1}
      >
        <SmallMovie movie={movie.item} />
      </TouchableOpacity>
    );
  };

  // Movie Pressed
  gotoMovieScreen = movie => {
    this.props.navigation.navigate("Movie", { movie });
  };

  // getList = async () => {
  //   let userDataStr = await AsyncStorage.getItem("MLuserInfo");
  //   let token = JSON.parse(userDataStr).token;
  //   let bearerToken = 'Bearer ' + token;
  //   console.log("Token : ",token );

  //   await fetch(`${customBaseUrl}/list`, {
  //     method: 'GET',
  //     withCredentials: true,
  //     credentials: 'include',
  //     headers: {
  //         'Authorization': bearerToken,
  //         'Content-Type': 'application/json'
  //     }
  // }).then(res => res.json())
  // .then(resJson => {
  //   console.log('RES : ',resJson);

  //   this.setState({
  //     moviesList:resJson.movies,
  //     seriesList: resJson.series,
  //     loadList:true
  //   })
  // })
  // .catch(error => console.log(error)
  // );
  // }

  // Series Pressed
  gotoSeriesScreen = series => {
    this.props.navigation.navigate("Series", { series });
  };
  renderSmallSeries = (series, index) => {
    // console.log("Mov : ", series);

    return (
      <TouchableOpacity
        onPress={() => this.gotoSeriesScreen(series.item)}
        key={series.item.id}
        activeOpacity={1}
      >
        <SmallMovie movie={series.item} />
      </TouchableOpacity>
    );
  };

  render() {
    const { userInfo } = this.props;
    console.log("render user info: ", userInfo.fullname);
    console.log(this.props.loadList, this.props.moviesList);

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            onRefresh={this.props.getList}
            refreshing={!this.props.loadList}
          />
        }
      >
        <View style={styles.topView}>
          <View style={styles.headView}>
            <Left></Left>
            <Right>
              <TouchableOpacity onPress={this.logOut}>
                <Icon name="log-out" style={styles.logoutIcon} type="Feather" />
              </TouchableOpacity>
            </Right>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: userInfo.photo || userInfo.avatarurl
            }}
            style={styles.profileImg}
          />
          <Text style={styles.userName}>
            {" "}
            {userInfo.name || userInfo.fullname}{" "}
          </Text>
        </View>

        <View style={styles.sectionView}>
          <Text style={styles.headLine}>Your Movies List </Text>
          {this.props.moviesList.length > 0 && this.props.loadList ? (
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.moviesList}
              renderItem={this.renderSmallMovie}
              sliderWidth={0.9 * Width}
              itemWidth={0.5 * Width}
              layout={"default"}
            />
          ) : this.props.loadList && this.props.moviesList.length == 0 ? (
            <Text style={styles.emptyMsg}>
              Sorry but You didn't add any Movies
            </Text>
          ) : (
            <View style={styles.nowPlayingMovies}>
              <ActivityIndicator color={mainColor} size="large" />
            </View>
          )}
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.headLine}>Your Series List </Text>
          {this.props.seriesList.length > 0 && this.props.loadList ? (
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.seriesList}
              renderItem={this.renderSmallSeries}
              sliderWidth={0.9 * Width}
              itemWidth={0.5 * Width}
              layout={"default"}
            />
          ) : this.props.loadList && this.props.seriesList.length == 0 ? (
            <Text style={styles.emptyMsg}>
              Sorry but You didn't add any Movies
            </Text>
          ) : (
            <View style={styles.nowPlayingMovies}>
              <ActivityIndicator color={mainColor} size="large" />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  moviesList: state.wlist.movieWL,
  seriesList:state.wlist.seriesWL,
  loadList: state.wlist.loadList
});

export default connect(mapStateToProps, { googleLogout,getList })(userProfile);
