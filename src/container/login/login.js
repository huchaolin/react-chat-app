import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd-mobile';
import {add, minus} from '../../redux/user.redux';

@connect(state => state, { add, minus})
class Login extends Component {
    render() {
        console.log(this.props)
        return (<div>
            登录页面{this.props.user}
            <Button onClick={this.props.add}>+</Button>
            <Button onClick={this.props.minus}>-</Button>
        </div>)
    }
};
export default Login;