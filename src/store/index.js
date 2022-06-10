import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './reducers/index';

const persistConfig = {
    key: 'brkp',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = createStore(
    persistedReducer,
    /* preloadedState, */
    composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(configureStore);
