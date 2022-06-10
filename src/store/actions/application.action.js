import {HIDE_ERROR, HIDE_LOADER, SHOW_ERROR, SHOW_LOADER} from "./actions";

export const showLoader = () => dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}
export const hideLoader = () => dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}
export const showError = data => dispatch => {
    dispatch({
        type: SHOW_ERROR,
        payload: data
    })
}
export const hideError= () => dispatch => {
    dispatch({
        type: HIDE_ERROR
    })
}
