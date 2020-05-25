import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl, 
  ActivityIndicator
} from "react-native";

import ActorCard from "../../components/ActorCard/ActorCard";
import { Container, Form, Item, Input, Icon, Left } from "native-base";
import { mainColor } from "../../configs/global";
import styles from "./style";
import commStyle from "../commStyle";
import { connect } from "react-redux";
import { getPopularActors, searchActor } from "../../actions/actor";

class Actor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      searchQuery:"", 
      actorSearch: "", 
      searchRslt:this.props.searchActorsRslt,
      loading:false
    };
  }

  componentDidMount() {
    this.props.getPopularActors();
  }

  renderActors = item => {
    return (
      <TouchableOpacity
        onPress={() => this.goToProfile(item)}
        key={item.id}
        activeOpacity={1}
      >
        <ActorCard actor={item} />
      </TouchableOpacity>
    );
  };

  goToProfile = item => {
    this.props.navigation.navigate("ActorProfile", {
      actor: item.item
    });
  };

  static getDerivedStateFromProps(props, state){
    console.log("props : ", props);
    console.log("state : ", state);
    
    
    if (props.searchActorsRslt != state.searchRslt){
        return {
        searchRslt: props.searchActorsRslt
      }
    }
  }
  
  searchActor = ()=>{
    if (this.state.searchQuery ){
      this.props.searchActor(this.state.searchQuery)
      this.setState({
        actorSearch: this.state.searchQuery
      })
    }else {
      this.props.getPopularActors();
    }
  }


  render() {
    return (
      <Container style={commStyle.container}>
        <View style={styles.searchView}>

          <Form style={styles.searchForm}>
            <Item>
              <Input
                placeholder="Search for Actor Here"
                style={styles.searchInput}
                placeholderStyle={styles.placeholder}
                onChangeText={a => this.setState({ searchQuery: a })}
                onSubmitEditing={this.searchActor}
              />
              <TouchableOpacity onPress={this.searchActor}>
                <Icon name="search" style={{ color: mainColor }} />
              </TouchableOpacity>
            </Item>
          </Form>

        </View>

        <View style={styles.sectionView}>
        
          <Item style={{ borderBottomWidth: 0 }}>
            <Left>
              {!this.state.searchRslt.length ? (
                <Text style={styles.headLine}>Top 10 of The Week</Text>
              ) : (
                <Text style={styles.headLine}>
                  {" "}
                  Search Result for {this.state.actorSearch}
                </Text>
              )}
            </Left>
          </Item>


          {this.state.searchRslt.length ? 
          <FlatList
          data={this.state.searchRslt}
          renderItem={item => this.renderActors(item)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.props.getPopularActors}
              colors={[mainColor]}
            />
          }
          // contentContainerStyle={styles.actorsListCont}
        />  
        : 
          <FlatList
            data={ this.props.popularActors}
            renderItem={item => this.renderActors(item)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.searchActor}
                colors={[mainColor]}
              />
            }
            // contentContainerStyle={styles.actorsListCont}
          />
        }
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  popularActors: state.actors.popularActors,
  searchActorsRslt: state.actors.searchActorsRslt,
  loading: state.actors.loading
});

export default connect(mapStateToProps, { getPopularActors, searchActor })(
  Actor
);
