import { SETPLAYING, SETPOPULAR, SETMOVIEWL, SETSeariesWL,ADDTOMOVIEWL } from "../actions/types";

const INITIAL_STATE = {
  popularMovies: [],
  popularMoviesDone: false,
  nowPlayingMovies: [],
  nowPlayingMoviesDone: false,
  movieWL: [], 
  loadList:false
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

    default:
      return state;
  }
};

export default movies;
