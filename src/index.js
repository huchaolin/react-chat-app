import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './reducers';
import App from './App';
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

