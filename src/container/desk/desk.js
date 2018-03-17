import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import {Switch, Route} from 'react-router-dom';
import NavTabBar from '../../component/navTabBar/navTabBar';
import {Redirect} from 'react-router-dom';
import UserList from '../../component/userList/userList';
// import BossList from '../../component/bossList/bossList';
// import GeniusList from '../../component/geniusList/geniusList';
// import {getMsgList,recvMsg} from '../../redux/chat.redux'


function Msg() {
    return (<div>
        消息页面
    </div>)
};function Profile() {
    return (<div>
       个人中心
    </div>)
};


@connect(
    state => state,
    null
)
class Desk extends Component {
    componentDidMount(){
		// if (!this.props.chat.chatmsg.length) {
		// 	this.props.getMsgList()
        // 	this.props.recvMsg()
        this.initPath();
    }
    initPath() {
        const {type} = this.props.user;
        const {pathname} = this.props.location;
        console.log('type', type)
        if(pathname == '/desk') {
            if(type == 'boss') {
                return this.props.history.push('/desk/geniuslist');
            };
            if(type == 'genius') {
                return this.props.history.push('/desk/bosslist');
            };
        }
    }
    render() {
        const {type} = this.props.user;
        const {pathname} = this.props.location;
        // const navPath =['/desk/bosslist', '/desk/geniuslist', '/desk/msg', '/desk/me'];
        const navList = [{
                    path: '/desk/geniuslist',
                    icon: 'boss',
                    iconText: '牛人',
                    navTitle: '牛人列表',
                    component: UserList,
                    hide: this.props.user.type !== 'boss'
                },
                {
                    path: '/desk/bosslist',
                    icon: 'job',
                    iconText: 'Boss',
                    navTitle: 'Boss列表',
                    component: UserList,
                    hide: this.props.user.type == 'boss'
                },
                {
                    path: '/desk/msg',
                    icon: 'msg',
                    iconText: '消息',
                    navTitle: '消息列表',
                    component: Msg
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
                <NavBar>{navList.find( v => (v.path == pathname)) ? navList.find( v => (v.path == pathname)).navTitle : null}</NavBar>
                <div>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
				</div>
                <div className="desk-footer">
                    <NavTabBar  data={navList}></NavTabBar>
                </div>
            </div>
        )
    }
};
export default Desk;