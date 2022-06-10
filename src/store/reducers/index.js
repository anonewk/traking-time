import {combineReducers} from "redux";
import applicationReducer from "./application.reducer";

const rootReducer = combineReducers({
    applicationReducer,

})
export default (state, action) =>
    rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
