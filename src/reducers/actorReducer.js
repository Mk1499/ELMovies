import { SETPOPULARACTORS, SETACTORSEARCH, LOADING } from "../actions/types";

const INITIAL_STATE = {
  popularActors: [],
  searchActorsRslt: [],
  loading: true
};

const actor = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETPOPULARACTORS:
      return {
        ...state,
        popularActors: action.payload,
        loading:false,
        searchActorsRslt:[]
      };
    case SETACTORSEARCH:
      return {
        ...state,
        searchActorsRslt: action.payload,
        loading:false

      };
    case LOADING:
      return {
          ...state,
          loading:action.payload
      };
    default:
      return state;
  }
};

export default actor;
