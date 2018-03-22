import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
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

import {startListen, getMessages} from './redux/chat.redux';
import {getUserList} from './redux/userList.redux';
import './index.css';
import './config';

@connect(
    state => state,
    {startListen, getMessages, getUserList}
)
class App extends Component {
    componentDidMount() {
        if(this.props.chat.msgs.length < 1) {
            this.props.getMessages();
            this.props.startListen();    
        };   
       if(this.props.userList.list.length == 0) {
            const type = this.props.user.type == 'boss' ? 'genius' : 'boss';
            this.props.getUserList(type);
            console.log('获取usersList')
        };
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/geniusinfo' component={GeniusInfo}></Route>
                        <Route path='/desk' component={Desk}></Route>
                        <Route path='/chat-to/:userid' component={Chat}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;