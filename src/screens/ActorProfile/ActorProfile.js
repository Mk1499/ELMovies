import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Icon } from "native-base";
import SmallMovie from "../../components/SmallMovie/SmallMovie";
import { baseUrl, apiKey, mainColor } from "../../configs/global";

const { width, height } = Dimensions.get("screen");

export default class ActorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: this.props.navigation.getParam("actor"),
      popularity: "",
      placeOfBirth: "",
      known_for_department: "",
      works: [
        {
          id: 10022,
          character: "Shane Wolf",
          original_title: "The Pacifier",
          overview:
            "Disgraced Navy SEAL Shane Wolfe is handed a new assignment: Protect the five Plummer kids from enemies of their recently deceased father -- a government scientist whose top-secret experiment remains hidden in the kids' house.",
          vote_count: 1983,
          video: false,
          media_type: "movie",
          poster_path: "/ayVLPibrtazh7U5FliWRLDMmG3d.jpg",
          backdrop_path: "/yyd7gjAIpOpkjjvkBqna0jBYe0h.jpg",
          popularity: 17.211,
          title: "The Pacifier",
          original_language: "en",
          genre_ids: [35, 10751],
          vote_average: 6,
          adult: false,
          release_date: "2005-03-04",
          credit_id: "52fe43099251416c7500111b"
        }
      ]
    };
    this.getBasicData();
  }

  componentDidMount() {
    this.getActorWork()
  }

  getBasicData = async () => {
    await fetch(`${baseUrl}/person/${this.state.actor.id}?api_key=${apiKey}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          popularity: res.popularity,
          placeOfBirth: res.place_of_birth,
          known_for_department: res.known_for_department
        });
      })
      .catch(err => console.log("Error while fetch actor data : ", err));
  };

  getActorWork = async () => {
    await fetch(
      `${baseUrl}/person/${this.state.actor.id}/combined_credits?api_key=${apiKey}`
    )
      .then(res => res.json())
      .then(res => {
        console.log("RES :",res);
        
        this.setState({
          works: res.cast.slice(0,5)
        });
      })
      .catch(err => console.log("Error while fetch all actor data : ", err));
  };

  // Movie Pressed
  gotoMovieScreen = movie => {
    this.props.navigation.replace("Movie", { movie });
  };

renderWork = ({item}) =>   {
  // console.log("M :",movie);
  
  return(
    <TouchableOpacity onPress={()=>{this.gotoMovieScreen(item)}} activeOpacity={1} >
      <SmallMovie movie={item} />
    </TouchableOpacity>
  )
}

  render() {
    return (
      <View>
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

        <SafeAreaView style={styles.mainView}>
          <View>
            <Text
              style={{
                fontSize: 0.08 * width,
                fontWeight: "bold"
              }}
            >
              {this.state.actor.name}
            </Text>
            <Text
              style={{
                fontSize: 0.05 * width,
                color: "grey"
              }}
            >
              {this.state.known_for_department}
            </Text>
          </View>
          <ScrollView>
            <View
              style={{
                marginTop: 0.05 * height,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  width: 0.45 * width,
                  alignItems: "center"
                }}
              >
                <View style={styles.iconView}>
                  <Icon name="trending-up" style={{ color: mainColor }} />
                </View>
                <Text
                  style={{
                    color: mainColor,
                    textAlign: "center",
                    marginTop: 15
                  }}
                >
                  {this.state.popularity}
                </Text>
              </View>
              <View
                style={{
                  width: 0.45 * width,
                  alignItems: "center"
                }}
              >
                <View style={styles.iconView}>
                  <Icon
                    name="flag"
                    style={{ color: mainColor }}
                    type="FontAwesome"
                  />
                </View>
                <Text
                  style={{
                    color: mainColor,
                    textAlign: "center",
                    marginTop: 15
                  }}
                >
                  {this.state.placeOfBirth}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 0.05 * height
              }}
            >
              <Text
                style={{
                  fontSize: 0.06 * width,
                  fontWeight: "bold"
                }}
              >
                Known For
              </Text>
              <FlatList horizontal={true}
                data={this.state.works}
                renderItem = {this.renderWork}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: -0.1 * height,
    backgroundColor: "#fff",
    padding: 0.05 * width,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
    height:0.6 * height
  },

  iconView: {
    width: 0.125 * width,
    height: 0.125 * width,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 0.5 * 0.125 * width,
    alignItems: "center",
    justifyContent: "center"
  }
});
