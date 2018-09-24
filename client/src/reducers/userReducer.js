import { FETCH_LOGIN } from '../actions/types';

const initialState = {
    userDetails: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN:
      state={
        ...state,
        userDetails: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;
