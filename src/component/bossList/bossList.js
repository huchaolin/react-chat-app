import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/userList.redux';

@connect(state => state, getUserList)
class BossList extends Component {
    componentDidMount() {
        this.props.getUserList('boss');
    }
    render() {
        return <div>
            Boss列表
            {this.props.userList.list ?
            this.props.userList.list.map(v => {
                return <div>{v.user}</div>
            }) 
                :null}
        </div>
    }
}
export default BossList;