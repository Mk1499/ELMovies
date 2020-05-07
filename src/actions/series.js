import { apiKey, baseUrl } from "../configs/global";
import { SETFAVOURITE, SETPOPULARSERIES, SETPLAYINGSERIES } from "./types";
import { AsyncStorage } from "react-native";

export const intializeFav = () => async dispatch => {
  try {
    let favMoves = await AsyncStorage.getItem("favSeriesList");
    if (!favMoves) {
      await AsyncStorage.setItem("favSeriesList", JSON.stringify([]));
      dispatch({
        type: SETFAVOURITE,
        payload: []
      });
    } else {
      let list = JSON.parse(favMoves);
      dispatch({
        type: SETFAVOURITE,
        payload: list
      });
    }
  } catch {}
};

//check if movies in Fav List
let existInFav = async movie => {
  let stringList = await AsyncStorage.getItem("favSeriesList");
  let list = JSON.parse(stringList);

  for (let i = 0; i < list.length; i++) {
    if (JSON.stringify(movie) == JSON.stringify(list[i])) return true;
  }
  return false;
};

// add movie to favourits
export const addToFav =  movie => async dispatch =>  {
  try {
    AsyncStorage.getItem("favSeriesList")
      .then(res => JSON.parse(res))
      .then(async res => {
        //console.log("RES", await existInFav(movie));
        if (!(await existInFav(movie))) {
          res.push(movie);
          AsyncStorage.setItem("favSeriesList", JSON.stringify(res));
          dispatch({
            type: SETFAVOURITE,
            payload: res
          });
          alert("Movie Added to your Favourit Successfully");
        } else {
          alert("Sorry but this movie is already in your Fav List");
        }
      })
      .catch(err => alert(err));
  } catch (error) {
    // Error saving data
    alert(error);
  }
};


export const removeFromFav = movie => async dispatch => {
  
}

export const getPopularSeries = () => async dispatch => {
  fetch(`${baseUrl}/tv/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then(res => res.json())
    .then(res => {
      //console.log("Movies : ", res);

      dispatch({
        type: SETPOPULARSERIES,
        payload: res.results.slice(0,5)
      });
    })
    .catch(err => {
     // console.log("popular movies Err : ", err);
    });
};

export const getNowPlayingSeries = () => dispatch => {
  fetch(`${baseUrl}/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: SETPLAYINGSERIES,
        payload: res.results.slice(0,5)
      });
    });
};
