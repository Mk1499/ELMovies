import { SETPLAYING, SETPOPULAR, SETFAVOURITE } from "../actions/types";

const INITIAL_STATE = {
  popularMovies: [],
  popularMoviesDone: false,
  nowPlayingMovies: [],
  nowPlayingMoviesDone: false,
  favouriteMovies: []
};

const movies = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETPOPULAR:
      return {
        ...state,
        popularMovies: action.payload,
        popularMoviesDone: true
      };
    case SETPLAYING:
      return {
        ...state,
        nowPlayingMovies: action.payload,
        nowPlayingMoviesDone: true
      };
    case SETFAVOURITE:
      return {
        ...state,
        favouriteMovies: action.payload
      };
    default:
      return state;
  }
};

export default movies;
