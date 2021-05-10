import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'

import rootSaga from './sagas'
import rootReducer from './reducers/index'

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
        ),
    )
    sagaMiddleware.run(rootSaga)

    return store
}
