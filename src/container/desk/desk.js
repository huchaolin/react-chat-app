import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import {Switch, Route} from 'react-router-dom';
import NavTabBar from '../../component/navTabBar/navTabBar';
import MsgList from '../../component/msgList/msgList';
import UserList from '../../component/userList/userList';
import Profile from '../../component/profile/profile';
import './desk.css';



@connect(
    state => state,
    null
)
class Desk extends Component {
    render() {
        const {type} = this.props.user;
        const {pathname} = this.props.location;
        const navList = [{
                    path: '/desk/geniuslist',
                    icon: 'boss',
                    iconText: '牛人',
                    navTitle: '牛人列表',
                    component: UserList,
                    hide: type !== 'boss'
                },
                {
                    path: '/desk/bosslist',
                    icon: 'job',
                    iconText: 'Boss',
                    navTitle: 'Boss列表',
                    component: UserList,
                    hide: type == 'boss'
                },
                {
                    path: '/desk/msglist',
                    icon: 'msg',
                    iconText: '消息',
                    navTitle: '消息列表',
                    component: MsgList
                },
                {
                    path: '/desk/me',
                    icon: 'user',
                    iconText: '我',
                    navTitle: '个人中心',
                    component: Profile
                }
            ];
            return (
            <div>
                <div className='desk-head'>
                     <NavBar>{navList.find( v => (v.path == pathname)) ? navList.find( v => (v.path == pathname)).navTitle : null}</NavBar>
                </div>
                <div className='desk-body'>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
				</div>
                <div className="desk-footer">
                    <NavTabBar  navList={navList}></NavTabBar>
                </div>
            </div>
        )
    }
};
export default Desk;