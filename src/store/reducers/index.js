import {combineReducers} from "redux";
import applicationReducer from "./application.reducer";
import authReducer from './auth.reducer';
import tasksReducer from './tasks.reducer';

const rootReducer = combineReducers({
    applicationReducer,
    authReducer,
    tasksReducer,
})
export default (state, action) =>
    rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
