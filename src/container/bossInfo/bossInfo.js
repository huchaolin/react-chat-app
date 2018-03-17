import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { NavBar, WingBlank, Icon,  List,  Button} from 'antd-mobile';
import WrapForm from '../../component/wrapForm/wrapForm';
import {update} from '../../redux/user.redux';
import CompleteInfo from '../../component/completeInfo/completeInfo';

@connect( state => state, {update})
@WrapForm
class BossInfo extends Component {
    handleUpdate = () => {
        const {avatar, company, job, money, desc} = this.props.state;
        this.props.update({avatar, company, job, money, desc});
    }
    render() {
        const redirectTo = this.props.user.redirectTo;

        return (<List>
            {redirectTo && (redirectTo !== '/bossinfo') ? <Redirect to={redirectTo}></Redirect> : null}
                    <NavBar
                        mode="dark"
                        >BOSS信息完善页
                    </NavBar>
                    <CompleteInfo handleChange={this.props.handleChange} isBoss={true} />
                    <WingBlank> 
                        <Button
                                onClick={this.handleUpdate} 
                                type="primary">保存</Button>
                    </WingBlank>
                </List>)
    }
}
export default BossInfo;