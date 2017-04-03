import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import mpdStatus from './reducers/MpdStatus'
import queue from './reducers/Queue'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(history, initialState) {

    const reducer = combineReducers({
        mpdStatus,
        queue,
        routing: routerReducer
    })
    
    const store = createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(history)
            )
        )
    )

    return store
}
