import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/userList.redux';

@connect(state => state, {getUserList})
class UserList extends Component {
    componentDidMount() {
        const type = this.props.user.type == 'boss' ? 'genius' : 'boss';
        this.props.getUserList(type);
    }
    render() {
        return <div>
        {this.props.userList.list ?
            this.props.userList.list.map(v => {
                return <div>{v.user}</div>
            }) 
                :null}
        </div>
    }
}
export default UserList;