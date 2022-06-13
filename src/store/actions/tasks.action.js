import {CREATE_TASK, UPDATE_TASK, DELETE_TASK} from './actions';

export const CreateTaskAction = (data) => dispatch => {
  dispatch({
    type: CREATE_TASK,
    payload: data,
  });
}

export const UpdateTaskAction = (data) => dispatch => {
  dispatch({
    type: UPDATE_TASK,
    payload: data,
  });
}

export const DeleteTaskAction = (data) => dispatch => {
  dispatch({
    type: DELETE_TASK,
    payload: data,
  });
}
