import {HIDE_ERROR, HIDE_LOADER, SHOW_ERROR, SHOW_LOADER} from "../actions/actions";

const initialState = {
    loading: false,
    error: false,
};

// eslint-disable-next-line default-param-last
export default function applicationReducer(state = initialState, action){
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        case SHOW_ERROR:
            return { ...state,  error: true, msg: action.payload};
        case HIDE_ERROR:
            return { ...state,  error: false, msg: false };
        default:
            return state;
    }
};
