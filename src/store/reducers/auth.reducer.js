import { LOGOUT, SIGN_IN, SIGN_UP } from '../actions/actions';

const initialState = {isLoggedIn: false, user: null};
// eslint-disable-next-line default-param-last
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {...state, isLoggedIn: true};
    case SIGN_UP:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
