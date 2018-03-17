import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/userList.redux';
import {createChatId} from '../../redux/chat.redux';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';

@connect(state => state, {getUserList, createChatId})
class UserList extends Component {
    componentDidMount() {
        const type = this.props.user.type == 'boss' ? 'genius' : 'boss';
        this.props.getUserList(type);
    }
    handleClick(v) {
        this.props.history.push(`/chatwith${v.user}`);
        this.props.createChatId(this.props.user._id, v._id);
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        //过滤出已完善个人信息的用户
        const userList = this.props.userList.list ? this.props.userList.list.filter( v => v.avatar) : null;
        return (
            <WingBlank>
			    <WhiteSpace />
                {userList ?  userList.map(v => (
                    <Card key={v._id}
                        onClick={() => this.handleClick(v)}
                    >
                        <Header
                            title={v.user}
                            thumb={require(`../avatarSelector/img/${v.avatar}.png`)}
                            extra={<span>{v.job}</span>}
                        ></Header>
                        <Body>
                            {v.type == 'boss' ? <div>公司:{v.company}</div> : null}
                            {v.desc.split('\n').map((d, i)=>(
                                <div key={i}>{d}</div>
                            ))}
                            {v.type=='boss'? <div>薪资:{v.money}</div> :null}
                        </Body>
                    </Card>)) : null}
            </WingBlank>)
    }
}
export default UserList;
