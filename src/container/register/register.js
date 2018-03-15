import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {List, InputItem, Radio, WhiteSpace, WingBlank, Button, NavBar, Icon} from 'antd-mobile';
import AppLogo from '../../component/appLogo/appLogo';
import {handleRegister} from '../../redux/user.redux';

const RadioItem = Radio.RadioItem;

@connect(state => state, {handleRegister})
class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            pwd2:'',
            type: 'boss',
        };
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }
    handleRegister() {
        this.props.handleRegister(this.state);
    }
    render() { 
        const redirectTo = this.props.user.redirectTo;
        return (<div>
          {redirectTo && (redirectTo !== '/register') ? <Redirect to={redirectTo}></Redirect> : null}
            <div>
            <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >注册账号</NavBar>
            </div>
            <AppLogo />
            <List>
                <InputItem placehoder="请输入用户名" onChange={ v => { this.handleChange("user", v) }}>
                    用户
                </InputItem>
                <InputItem placehoder="请输入密码" type="password" onChange={ v => { this.handleChange("pwd", v)}}>
                    密码
                </InputItem>
                <InputItem placehoder="请再次输入密码" type="password" onChange={ v => { this.handleChange("pwd2", v)}}>
                    确认密码
                </InputItem>
                <RadioItem checked={this.state.type == "boss" } onChange={ v => { this.handleChange("type", "boss") }}>BOSS</RadioItem>
                <RadioItem checked={this.state.type == "genius"} onChange={ v => { this.handleChange("type", "genius") }}>牛人</RadioItem>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </List>
        </div>)
    }
};
export default Register;