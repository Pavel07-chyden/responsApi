import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import reposReducer from '../reducers/reposReducer';


export const rootReducer = combineReducers({
    repos: reposReducer, 
});

//@ts-ignore
const composeEnhancers = window["REDUX_DEVTOOLS_EXTENSION_COMPOSE"] || compose;
export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store