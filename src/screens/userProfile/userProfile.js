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
import { getList } from "../../actions/watchList";
const { width: Width, height: Height } = Dimensions.get("window");
import DocumentPicker from "react-native-document-picker";

class userProfile extends Component {
  constructor(props) {
    super(props);
    console.log("User Info2 : ", this.props.userInfo);
    this.state = {
      darkMode: true,
      loadList: this.props.loadList,
      moviesList: [],
      seriesList: [],
      userImg:
        "https://provisionhealthcare.com/wp-content/uploads/2018/11/user-avatar.jpg"
    };
  }

  componentDidMount = async () => {
    let { userInfo } = this.props;
    await this.props.getList();
    let userImg = userInfo.avatarurl;
    console.log("P : ", this.props.moviesList);
    console.log("user info screen : ", userInfo);
    if (userInfo.avatarurl.startsWith("images"))
      userImg = `${customBaseUrl}/${userInfo.avatarurl}`;
    
    console.log("userIMG : ", userImg);
    
      this.setState({
      userImg
    });
    // this.props.navigation.addListener("didFocus", async () => {

    // });
  };

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

  updateImg = async () => {
    // Pick a single file
    let userToken = JSON.parse(await AsyncStorage.getItem("MLuserInfo")).token;
    let bearerToken = "Bearer " + userToken;
    let formData = new FormData();

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images]
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );

      formData.append("new-image", res);
      console.log("FD : ", formData);

      this.setState({
        userImg: res.uri
      });
      await fetch(`${customBaseUrl}/users/updateimg`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: bearerToken
        },
        body: formData
      })
        .then(res => {
          console.log("EEEE : ", res);

          return res.json();
        })
        .then(async res => {
          console.log("res Back : ", res);
          let tempUsrData =  JSON.parse (await AsyncStorage.getItem("MLuserInfo")) ; 
          tempUsrData.avatarurl = res.imgUrl ; 
          await AsyncStorage.setItem("MLuserInfo", JSON.stringify(tempUsrData))
        })
        .catch(err => console.log("upload err: ", err));



      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  // Series Pressed
  gotoSeriesScreen = series => {
    this.props.navigation.navigate("Series", {
      series: {
        ...series,
        id: series.mediaid,
        name: series.title,
        first_air_date: series.release_date
      }
    });
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
          <TouchableOpacity
            onPress={this.updateImg}
            style={styles.profileImgBtn}
          >
            <Image
              source={{
                uri: this.state.userImg
              }}
              style={styles.profileImg}
            />
            <Icon
              name="edit"
              type="FontAwesome5"
              style={{
                color: mainColor,
                position: "relative",
                top: "-15%",
                left: "70%"
              }}
              size="large"
            />
          </TouchableOpacity>
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
  moviesList: state.wlist.movieWL || [],
  seriesList: state.wlist.seriesWL || [],
  loadList: state.wlist.loadList
});

export default connect(mapStateToProps, { googleLogout, getList })(userProfile);
