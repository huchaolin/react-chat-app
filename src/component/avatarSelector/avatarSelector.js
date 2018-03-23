import React, {Component} from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                    .split(',')
                    .map( v => ({
                     icon: require(`./img/${v}.png`),
                     text: v}));
@connect(state => state, null )
class AvatarSelector extends Component {
    static propTypes = {
        //属性检测，有利于提前检测出错误
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            avatar: ''
        };
        this.changeInfo = this.changeInfo.bind(this);    
    }
    
    componentWillMount() {
        this.changeInfo();
    }

    componentDidMount() {
        this.fixCarousel();
    }

    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }

    changeInfo() {
        if(this.props.user.avatar) {
             const avatar = require(`./img/${this.props.user.avatar}.png`);
             this.setState({avatar: avatar});
        };
    }
    
    render() {
     
        const  GridHeader = (this.state.avatar)
                            ? (<div>
                                <span>已选择头像：</span>
                                <img style={{width:'25px'}} src={this.state.avatar} alt=''></img>
                            </div>)
                            : (<span>请选择头像</span>)
        return (
            <List renderHeader={ () => GridHeader}>
                <Grid 
                data={avatarList}
                isCarousel 
                onClick={ v => {
                    console.log('avatar', v)
                    this.setState({avatar: v.icon});
                    this.props.selectAvatar(v.text);
                }}
                />
            </List>
        )
    }
};
export default AvatarSelector;