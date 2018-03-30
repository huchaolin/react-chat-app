import React, {Component}from 'react';
import ReactDom from 'react-dom';
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

ReactDom.render(<Index />, document.getElementById('root'));

