import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from './redux/store'
import { configureApi } from './api'

import './index.css';

const history = createBrowserHistory();
const store = configureStore();
export const api = configureApi(store)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
