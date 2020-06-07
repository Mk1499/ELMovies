import { customBaseUrl } from "../configs/global";
import {SETSeariesWL,SETMOVIEWL } from "./types";
import { AsyncStorage } from "react-native";



export const addMovieToWatchList = (movie) => async dispatch => {
    let userid = JSON.parse( await AsyncStorage.getItem("MLuserInfo")).id; 
    console.log("UId : ",userid);
    let msg = {
        userid,
        ...movie
    }
    
    await fetch(`${customBaseUrl}/list/add`,{
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(msg)
      })
    .then(res => res.json())
    .then(res => {        
        dispatch({
            type:SETMOVIEWL, 
            payload:msg
        })
    })
}