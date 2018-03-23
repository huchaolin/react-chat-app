import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar, WingBlank, InputItem, TextareaItem, List, Button} from 'antd-mobile';
import {update} from '../../redux/user.redux';
import WrapForm from '../../component/wrapForm/wrapForm';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';
//暂时想合并一下 boss与mike的信息完成页面
@WrapForm
@connect( state => state, {update})
class UserInfo extends Component {
    handleUpdate = () => {
        const isBoss = this.props.user.type == 'boss' ;
        const {avatar, company, job, money, desc} = this.props.state;
        isBoss ? this.props.update({avatar, company, job, money, desc}) : this.props.update({avatar, job, desc});
    }
    render() {
        const user = this.props.user;
        const isBoss = user.type == 'boss' ;
        const redirectTo = user.redirectTo;
        const state = this.props.state;
        return (<div>
                <List>
            {redirectTo && (redirectTo !== ('/bossinfo' || '/geniusinfo')) ? <Redirect to={redirectTo}></Redirect> : null}
                    <NavBar
                        mode="dark"
                        >{isBoss ? 'BOSS信息完善页' : '牛人信息完善页'}
                    </NavBar>
                <AvatarSelector selectAvatar = { v => this.props.handleChange('avatar', v) } /> 
                {isBoss ?
                    <InputItem 
                        onChange={v => this.props.handleChange('company', v)}
                        value={user.company ? user.company : state.company}>公司名称</InputItem> :
                    null}
                <InputItem 
                        onChange={v => this.props.handleChange('job', v)}
                        value={user.job ? user.job : state.job}
                        >{isBoss ? '招聘职位' : '应聘职位'}</InputItem>
                {isBoss ?
                    <InputItem 
                        onChange={v => this.props.handleChange('money', v)}
                        value={user.money ? user.money : state.money}
                        >职位薪资</InputItem> :
                    null}
                <List>
                <TextareaItem
                    onChange={ v => this.props.handleChange('desc', v)}
                    title={isBoss ? "职位要求" : "个人简介"}
                    value={user.desc ? user.desc : state.desc}
                    rows={3}
                    autoHeight
                />
                </List>
                 <WingBlank> 
                        <Button
                                onClick={this.handleUpdate} 
                                type="primary">保存</Button>
                </WingBlank>
                
                </List>
            </div>)
    }
};
export default UserInfo;