import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

@withRouter
class NavTabBar extends Component {
    static propTypes = {
        //属性检测，有利于提前检测出错误
        data: PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide);
        const {pathname}= this.props.location;
        return (
            <TabBar>
                {navList.map( v => <TabBar.Item
                     title={v.text}
                     key={v.path}
                     icon={{uri: require(`./img/${v.icon}.png`)}}
                     selectedIcon={{ uri:  require(`./img/${v.icon}-active.png`)}}
                     selected={v.path == pathname}
                     onPress={ () => {this.props.history.push(v.path)}}
                />)}
            </TabBar>
        )
    }
};
export default NavTabBar;