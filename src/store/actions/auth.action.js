import {LOGOUT, SIGN_IN, SIGN_UP} from './actions';

export const SignInAction = (data) => dispatch => {
  dispatch({
    type: SIGN_IN,
    payload: data,
  });
}
export const SignUpAction = (data) => dispatch => {
  dispatch({
    type: SIGN_UP,
    payload: data,
  });
}
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
