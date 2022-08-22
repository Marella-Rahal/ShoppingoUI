import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import {Store} from './Redux/Store';


ReactDOM.render(
    <Provider store={Store}>
        <App/>  
    </Provider>
    ,document.getElementById("root")

);

