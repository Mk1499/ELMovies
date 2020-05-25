import { apiKey, baseUrl } from "../configs/global";
import { SETPOPULARACTORS,SETACTORSEARCH,LOADING } from "./types";
import { AsyncStorage } from "react-native";

export const getPopularActors = () => async dispatch => {

    // dispatch({
    //     type:LOADING,
    //     payload:true
    // })

  await fetch(
    `${baseUrl}/person/popular?api_key=${apiKey}&language=en-US&page=1`
  )
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: SETPOPULARACTORS,
        payload: res.results.slice(0, 10)
      });
    })
    .catch(err => {
      // console.log("popular movies Err : ", err);
    });
};


export const searchActor = (name) => async dispatch => {
    // console.log("Khan : " , name);
    // dispatch({
    //     type:LOADING,
    //     payload:true
    // })
    await fetch(`${baseUrl}/search/person/?api_key=${apiKey}&query=${name}`)
    .then(res => res.json())
    .then(res => {        
        dispatch({
            type:SETACTORSEARCH, 
            payload:res.results.slice(0,10)
        })
    })
}