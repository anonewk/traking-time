import {CREATE_EVENT, READ_EVENT, UPDATE_EVENT, DELETE_EVENT} from '../actions/actions';

const initialState = [];

// eslint-disable-next-line default-param-last
export default function eventsReducer(state = initialState, action){
    switch (action.type) {
        case CREATE_EVENT:
            return state.concat(action.payload);
        case READ_EVENT:
            return action.payload;
        case UPDATE_EVENT:
            return state.map(event => {
                if (event.id !== action.payload.id) {
                    return event;
                }
                return {
                    ...action.payload,
                };
            });
        case DELETE_EVENT:
            return state.filter(event => event.id !== action.payload);
        default:
            return state;
    }
};
