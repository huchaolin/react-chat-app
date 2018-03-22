import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import {loadData} from '../../redux/user.redux';

@withRouter
@connect(state => state, {loadData})
class AuthRoute extends Component {
    componentDidMount() {
        const paths = ['/login', '/register']
        const pathname = this.props.location.pathname;
        if(paths.indexOf(pathname) > -1) {
            return null;
        };
        axios.get('/user/info')
            .then(res => {
                if(res.status == 200 && res.data.code == 0) {
                    // code == 0 表示有登录信息
                    console.log('res.data', res.data)
                        this.props.loadData(res.data.data);
                        this.props.history.push(`${this.props.user.redirectTo}`);
                } else {
                    this.props.history.push('/login');
                }
            });
    }
    render() {
        return  null;
         
    }
};
export default AuthRoute;