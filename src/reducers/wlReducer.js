import { SETWL, ADDSeariesWL, ADDTOMOVIEWL } from "../actions/types";

const INITIAL_STATE = {
  movieWL: [],
  seriesWL: [],
  loadList: false
};

const wl = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETWL:
      return {
        ...state,
        movieWL: action.payload.movies,
        seriesWL:action.payload.series,
        loadList: true
      };
    case ADDTOMOVIEWL:
      return {
        ...state,
        movieWL: [action.payload, ...state.movieWL]
      };
    case ADDSeariesWL:
      return {
        ...state,
        seriesWL: [action.payload, ...state.seriesWL]
      };
    default:
      return state;
  }
};

export default wl;
