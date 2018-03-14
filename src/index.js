import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './reducers';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authRoute/authRoute';
// import './index.css';
// import './config';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f=>f
));

class App extends Component {
    render() { 
        return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        {/* <Route path='/boss' component={Boss}></Route> */}
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    )}
};

ReactDOM.render(<App />, document.getElementById('root'));

