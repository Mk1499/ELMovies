import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Container, Item, Form, Input, Label, Icon, Left } from "native-base";
import {styles} from '../Home/style'

import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import Carousel from 'react-native-snap-carousel';

import {
  getNowPlayingSeries,
  getPopularSeries,
  addToFav,
  intializeFav
} from "../../actions/series";
import {mainColor} from '../../configs/global'; 

// import External Style
import commStyle from "../commStyle";

// Import Components
import SmallMovie from "../../components/SmallMovie/SmallMovie";
import BigMovie from "../../components/BigMovie/BigMovie";

const { width: Width, height: Height } = Dimensions.get("window");

class TV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSeries: "",
      popularSeries: [],
      popularSeriesDone: false,
      nowPlayingSeries: [],
      nowPlayingSeriesDone: false
    };
  }

  componentDidMount = async () => {
   // console.log("Props : ", this.props);

    this.props.getPopularSeries();
    this.props.getNowPlayingSeries();
    this.props.intializeFav();
    SplashScreen.hide();
  };

  // Search Button Pressed
  gotoSearchRes = () => {
    if (this.state.searchSeries)
      this.props.navigation.navigate("SearchSeriesRes", {
        seriesName: this.state.searchSeries
      });
    else alert("Please Write Series name");
  };

  // Series Pressed
  gotoSeriesScreen = series => {
    this.props.navigation.navigate("Series", { series });
  };
  renderSmallSeries = (series, index) => {
    // console.log("Mov : ", series);
    
    return(

      <TouchableOpacity
      onPress={() => this.gotoSeriesScreen(series.item)}
      key={series.item.id}
      >
      <SmallMovie movie={series.item} />
    </TouchableOpacity>
      ) 
    
  }

  render() {
    return (
      <Container style={commStyle.container}>
        {/* Search Input Feild */}
        <View style={styles.searchView}>
          <Form style={styles.searchForm}>
            <Item>
              <Input
                placeholder="Search for Series here"
                style={styles.searchInput}
                placeholderStyle={styles.placeholder}
                onChangeText={m => this.setState({ searchSeries: m })}
                onSubmitEditing={this.gotoSearchRes}
              />
              <TouchableOpacity onPress={this.gotoSearchRes}>
                <Icon name="search" style={{ color: mainColor }} />
              </TouchableOpacity>
            </Item>
          </Form>
        </View>
        <ScrollView contentContainerStyle={styles.scrollVeiwCont}>
          {/* Recent Series */}
          <View style={styles.section}>
            <Item style={{ borderBottomWidth: 0 }}>
              <Left>
                <Text style={styles.headLine}>On Air</Text>
              </Left>
            </Item>
            {this.props.series.nowPlayingSeries.length > 0 &&
            this.props.series.nowPlayingSeriesDone ? (
              <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.props.series.nowPlayingSeries}
              renderItem={this.renderSmallSeries}
              sliderWidth={0.9 *Width}
              itemWidth={0.5*Width}
              layout={'default'}
            />
            ) : (
              <View style={styles.nowPlayingSeries}>
                <ActivityIndicator color={mainColor} size="large" />
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
            {this.props.series.popularSeries.length > 0 &&
            this.props.series.popularSeriesDone ? (
              this.props.series.popularSeries.map(series => (
                <TouchableOpacity
                  onPress={() => this.gotoSeriesScreen(series)}
                  key={series.id}
                >
                  <BigMovie
                    movie={series}
                    addToFav={() => this.props.addToFav(series)}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.popularSeries}>
                <ActivityIndicator color={mainColor} size="large" />
              </View>
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  series: state.series
});

export default connect(mapStateToProps, {
  getPopularSeries,
  getNowPlayingSeries,
  addToFav,
  intializeFav
})(TV);

