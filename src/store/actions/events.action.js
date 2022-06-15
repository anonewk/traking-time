import {CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT} from './actions';

export const CreateEventAction = (data) => dispatch => {
  dispatch({
    type: CREATE_EVENT,
    payload: data,
  });
}

export const UpdateEventAction = (data) => dispatch => {
  dispatch({
    type: UPDATE_EVENT,
    payload: data,
  });
}

export const DeleteEventAction = (data) => dispatch => {
  dispatch({
    type: DELETE_EVENT,
    payload: data,
  });
}
