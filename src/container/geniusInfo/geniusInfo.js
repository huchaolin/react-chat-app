import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { NavBar, WingBlank, Icon,  List,  Button} from 'antd-mobile';
import WrapForm from '../../component/wrapForm/wrapForm';
import {update} from '../../redux/user.redux';
import CompleteInfo from '../../component/completeInfo/completeInfo';

@connect( state => state, {update})
@WrapForm
class GeniusInfo extends Component {
    handleUpdate = () => {
        const {avatar, job, desc} = this.props.state;
        this.props.update({avatar, job, desc});
    }
    render() {
        const redirectTo = this.props.user.redirectTo;
        return (<List>
                 {redirectTo && (redirectTo !== '/geniusinfo') ? <Redirect to={redirectTo}></Redirect> : null}
                    <NavBar
                        mode="dark"
                        >牛人信息完善页
                    </NavBar>
                    <CompleteInfo handleChange={this.props.handleChange} isBoss={false} />
                    <WingBlank> 
                        <Button
                                onClick={this.handleUpdate} 
                                type="primary">保存</Button>
                    </WingBlank>
                </List>)
    }
}
export default GeniusInfo;

