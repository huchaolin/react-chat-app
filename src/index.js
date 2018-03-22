import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './reducers';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authRoute/authRoute';
import BossInfo from './container/bossInfo/bossInfo';
import GeniusInfo from './container/geniusInfo/geniusInfo';
import Desk from './container/desk/desk';
import Chat from './container/chat/chat';
import App from './App';
import './index.css';
import './config';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f=>f
));

class Index extends Component {
    render() { 
        return (
        <Provider store={store}>
            <App />
        </Provider>
    )}
};

ReactDOM.render(<Index />, document.getElementById('root'));

