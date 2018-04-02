import QueueAnim from 'rc-queue-anim';
import React, {Component}from 'react';
import {withRouter, Route, Switch } from 'react-router-dom';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authRoute/authRoute';
import UserInfo from './container/userInfo/userInfo';
import Desk from './container/desk/desk';
import Chat from './container/chat/chat';
import {connect} from 'react-redux';
import {startListen, getMessages} from './redux/chat.redux';
import {getUserList} from './redux/userList.redux';
import './index.css';
import './config';

@withRouter
@connect(
    state => state,
    {startListen, getMessages, getUserList}
)
class App extends Component {
    componentWillReceiveProps(nextProps) {
        // console.log('nextProps',nextProps)
        //防止刷新之后数据没有了
        if(nextProps.user.type) {
            if(!nextProps.chat.hasGetMsgs) {
                nextProps.getMessages();
                nextProps.startListen();    
            };   
            if(!nextProps.userList.hasGetUserList) {
                nextProps.getUserList();
            };
        }
    }

    render() {
        return (
                <div>
                    <AuthRoute></AuthRoute>
                    <QueueAnim>
                    <Switch> 
                        <Route path='/bossinfo' component={UserInfo}></Route> */}
                        <Route path='/geniusinfo' component={UserInfo}></Route>
                        <Route path='/desk' component={Desk}></Route>
                        <Route path='/chat-to/:userid' component={Chat}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                    </Switch>

                    </QueueAnim>
                </div>
        )
    }
}

export default App;