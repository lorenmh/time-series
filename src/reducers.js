import {
  UPDATE_CHANNELS
} from './actions';

const rootReducer = (state={}, action) => {
  switch (action.type) {
    case UPDATE_CHANNELS:
      return {
        ...state,
        channels: action.channels
      };
    default:
      return state;
  }
}

export default rootReducer;
