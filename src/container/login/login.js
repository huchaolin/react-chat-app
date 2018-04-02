import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {WingBlank, WhiteSpace, Button, List, InputItem} from 'antd-mobile';
import {handleLogin} from '../../redux/user.redux';
import AppLogo from '../../component/appLogo/appLogo';
import WrapForm from '../../component/wrapForm/wrapForm';

@connect(state => state, {handleLogin})
@WrapForm
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleEnter(event) {
        // console.log('event',event)
        event.preventDefault();
        this.handleLogin();
    }
    handleLogin() {
        const {user, pwd} = this.props.state;
        this.props.handleLogin({user, pwd});
    }
    handleRegister() {
        this.props.history.push('/register');
    }
    render() {
        const redirectTo = this.props.user.redirectTo;
          return (<div>
            {redirectTo && (redirectTo !== '/login') ? <Redirect to={redirectTo}></Redirect> : null}
            <AppLogo/>
            <WingBlank>
                <List>
                <form onSubmit={event => this.handleEnter(event)}> 
                    <InputItem placeholder="请输入用户名" 
                        onChange={ v => this.props.handleChange('user', v)}>用户名
                    </InputItem>
                    <InputItem placeholder="请输入密码" type="password" 
                        onChange={ v => this.props.handleChange('pwd', v)}>
                        密码
                    </InputItem>
                <button style={{display:'none'}}></button>            
                </form>              
                </List>
                <Button type="primary"  onClick={this.handleLogin}>登录</Button>  
                <WhiteSpace/>  
                <Button type="primary"  onClick={this.handleRegister}>注册</Button> 
            </WingBlank>
        </div>)
    }
};
export default Login;