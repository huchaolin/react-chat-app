import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
@withRouter
class AuthRoute extends Component {
    componentDidMount() {
        const paths = ['/login', '/register']
        const pathname = this.props.location.pathname;
        if(pathname == '/') {
            return this.props.history.push('/login');
            
        };
        if(paths.indexOf(pathname) > -1) {
            return null;
        };
        axios.get('/user/info')
            .then(res => {
                if(res.status == 200) {
                    // code == 0 表示有登录信息
                    if(res.data.code == 0) {

                    }
                } else {
                    this.props.history.push('/login');
                }
            });
    }
    render() {
        return (<div>
            路由判断
        </div>)
    }
};
export default AuthRoute;