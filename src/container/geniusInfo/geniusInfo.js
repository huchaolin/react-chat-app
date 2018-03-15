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
    render() {
        const redirectTo = this.props.user.redirectTo;
        return (<List>
                 {redirectTo && (redirectTo !== '/geniusinfo') ? <Redirect to={redirectTo}></Redirect> : null}
                    <NavBar
                        mode="dark"
                        >牛人信息完善页
                    </NavBar>
                    <CompleteInfo {...this.props} isBoss={false} />
                    <WingBlank> 
                        <Button
                                onClick={() => {this.props.update(this.props.state)}} 
                                type="primary">保存</Button>
                    </WingBlank>
                </List>)
    }
}
export default GeniusInfo;