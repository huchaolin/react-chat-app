import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import {Switch, Route} from 'react-router-dom';
import NavTabBar from '../../component/navTabBar/navTabBar';
import MsgList from '../../component/msgList/msgList';
import {Redirect} from 'react-router-dom';
import UserList from '../../component/userList/userList';
import {startListen, getMessages} from '../../redux/chat.redux';
import {getUserList} from '../../redux/userList.redux';
import './desk.css';


function Profile() {
    return (<div>
       个人中心
    </div>)
};


@connect(
    state => state,
    {startListen, getMessages, getUserList}
)
class Desk extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // this.initPath();
    }
    componentWillReceiveProps(nextProps) {
        const {type} = nextProps.user;
        if(!type) { return null};
        const {pathname} = nextProps.location;
        if(pathname == '/desk') {
            if(type == 'boss') {
                return this.props.history.push('/desk/geniuslist');
            };
            if(type == 'genius') {
                return this.props.history.push('/desk/bosslist');
            };
        }
    }
    // initPath() {
    //     const {type} = this.props.user;
    //     const {pathname} = this.props.location;
    //     debugger
    //     if(pathname == '/desk') {
    //         if(type == 'boss') {
    //             return this.props.history.push('/desk/geniuslist');
    //         };
    //         if(type == 'genius') {
    //             return this.props.history.push('/desk/bosslist');
    //         };
    //     }
    // }
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