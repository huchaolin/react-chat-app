import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

@withRouter
@connect(state => state, null)
class NavTabBar extends Component {
    static propTypes = {
        //属性检测，有利于提前检测出错误
        navList : PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.navList.filter(v => !v.hide);
        const userid = this.props.user._id;
        const {pathname}= this.props.location;
        const msgs = this.props.chat.msgs;
        let unReadNum = 0;
        const hasGetMsgs=  this.props.chat.hasGetMsgs;
        if(!hasGetMsgs) {return null};
         msgs.length > 0 ? msgs.forEach(v => {
            if(v.from !== userid) {
                !v.isRead ? unReadNum++ : null;
            }
        }) : null;
        return (
            <TabBar>
                {navList.map( v => <TabBar.Item
                     title={v.text}
                     key={v.path}
                     icon={{uri: require(`./img/${v.icon}.png`)}}
                     selectedIcon={{ uri:  require(`./img/${v.icon}-active.png`)}}
                     selected={v.path == pathname}
                     badge={v.path == '/desk/msglist' ? (unReadNum ? unReadNum :null) : null}
                     onPress={ () => {this.props.history.push(v.path)}}
                />)}
            </TabBar>
        )
    }
};
export default NavTabBar;