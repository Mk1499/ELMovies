import { SETPOPULARSERIES, SETPLAYINGSERIES, SETFAVOURITE } from "../actions/types";

const INITIAL_STATE = {
  popularSeries: [],
  popularSeriesDone: false,
  nowPlayingSeries: [],
  nowPlayingSeriesDone: false,
  favouriteSeries: []
};

const series = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETPOPULARSERIES:
      return {
        ...state,
        popularSeries: action.payload,
        popularSeriesDone: true
      };
    case SETPLAYINGSERIES:
      return {
        ...state,
        nowPlayingSeries: action.payload,
        nowPlayingSeriesDone: true
      };
    case SETFAVOURITE:
      return {
        ...state,
        favouriteSeries: action.payload
      };
    default:
      return state;
  }
};

export default series;
