import {CREATE_TASK, READ_TASK, UPDATE_TASK, DELETE_TASK} from '../actions/actions';

const initialState = [];

// eslint-disable-next-line default-param-last
export default function tasksReducer(state = initialState, action){
    switch (action.type) {
        case CREATE_TASK:
            return state.concat(action.payload);
        case READ_TASK:
            return action.payload;
        case UPDATE_TASK:
            return state.map(task => {
                if (task.id !== action.payload.id) {
                    return task;
                }
                return {
                    ...action.payload,
                };
            });
        case DELETE_TASK:
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
};
