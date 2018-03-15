import React, {Component} from 'react';
import {InputItem,  TextareaItem, List} from 'antd-mobile';
import AvatarSelector from '../avatarSelector/avatarSelector';

class CompleteInfo extends Component {
    render() {
        const isBoss = this.props.isBoss;
        return (<div>
                <AvatarSelector selectAvatar = { v => this.props.handleChange('avatar', v) } /> 
                {isBoss ?
                    <InputItem onChange={v => this.props.handleChange('company', v)}>公司名称</InputItem> :
                    null}
                <InputItem onChange={v => this.props.handleChange('job', v)}>{isBoss ? '招聘职位' : '应聘职位'}</InputItem>
                {isBoss ?
                    <InputItem onChange={v => this.props.handleChange('money', v)}>职位薪资</InputItem> :
                    null}
                <List>
                <TextareaItem
                    onChange={ v => this.props.handleChange('desc', v)}
                    title={this.props.isBoss ? "职位要求" : "个人简介"}
                    rows={3}
                    autoHeight
                />
                </List>
            </div>)
    }
}
export default CompleteInfo;