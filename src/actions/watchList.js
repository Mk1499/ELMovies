import { customBaseUrl } from "../configs/global";
import { SETWL, ADDTOMOVIEWL, ADDSeariesWL } from "./types";
import { AsyncStorage } from "react-native";
import { RNToasty } from "react-native-toasty";

export const addMovieToWatchList = (media, type) => async dispatch => {
  let userToken = JSON.parse(await AsyncStorage.getItem("MLuserInfo")).token;
  let bearerToken = "Bearer " + userToken;
  
  if (type === "series"){
    media.title = media.name; 
    media.release_date = media.first_air_date; 

  }

  console.log("UToken : ", userToken);
  let msg = {
    type,
    ...media
  };

  msg["mediaid"] = msg.id;

  console.log("Msg : ", msg);
  await fetch(`${customBaseUrl}/list/add`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken
    },
    body: JSON.stringify(msg)
  })
    .then(res => res.json())
    .then(res => {
      console.log("WLRES : ", res);
      if (res.error) {
        RNToasty.Error({
          title: res.error
        });
      } else {
        RNToasty.Success({
          title: "Added To Your List"
        });
      }
      if (type === "movie") {
        dispatch({
          type: ADDTOMOVIEWL,
          payload: msg
        });
      } else {
        dispatch({
          type: ADDSeariesWL,
          payload: msg
        });
      }
    })
    .catch(err => console.log(err));
};

export const getList = () => async dispatch => {
  let userDataStr = await AsyncStorage.getItem("MLuserInfo");
  let token = JSON.parse(userDataStr).token;
  let bearerToken = "Bearer " + token;
  console.log("Token : ", token);

  await fetch(`${customBaseUrl}/list`, {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: bearerToken,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(resJson => {
      console.log("RES : ", resJson);

      // this.setState({
      //   moviesList:resJson.movies,
      //   seriesList: resJson.series,
      //   loadList:true
      // })
      dispatch({
        type: SETWL,
        payload: resJson
      });
    })
    .catch(error => console.log(error));
};
