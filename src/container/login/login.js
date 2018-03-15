import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {WingBlank, WhiteSpace, Button, List, InputItem} from 'antd-mobile';

import {handleLogin} from '../../redux/user.redux';
import AppLogo from '../../component/appLogo/appLogo';

@connect(state => state, {handleLogin})
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            pwd:''
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this. handleRegister.bind(this);
    }
    handleLogin() {
        const {user, pwd} = this.state;
        this.props.handleLogin({user, pwd});
    }
    handleRegister() {
        this.props.history.push('/register');
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }
    render() {
        const redirectTo = this.props.user.redirectTo;
          return (<div>
            {redirectTo && (redirectTo !== '/login') ? <Redirect to={redirectTo}></Redirect> : null}
            <AppLogo/>
            <WingBlank>
                <List>
                    <InputItem placeholder="请输入用户名" 
                        onChange={ v => this.handleChange('user', v)}>用户名
                    </InputItem>
                    <InputItem placeholder="请输入密码" type="password" 
                        onChange={ v => this.handleChange('pwd', v)}>
                        密码
                    </InputItem>
                </List>
                <Button type="primary"  onClick={this.handleLogin}>登录</Button>  
                <WhiteSpace/>              
                <Button type="primary"  onClick={this.handleRegister}>注册</Button>                
            </WingBlank>
        </div>)
    }
};
export default Login;