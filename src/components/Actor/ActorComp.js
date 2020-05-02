import React, { Component } from 'react'
import { Text, View , Image } from 'react-native';
import {styles} from './Actorstyles';


export default class ActorComp extends Component {
    componentDidMount() {
        console.log("Actor Data : ", this.props.actor);
        
    }
    
    render() {
        return (
            <View style={styles.smallActor}>
                <Image  source={{ uri:"https://image.tmdb.org/t/p/original"+this.props.actor.poster_path}} style={styles.smallActorImg} />
                <Text style={styles.smallActorTitle}>{this.props.actor.name}</Text>
                <Text style={styles.actorCharacter}>{this.props.actor.character}</Text>

            </View>
        )
    }
}

