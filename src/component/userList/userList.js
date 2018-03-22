import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import { Object } from 'core-js';

@connect(state => state, null)
class UserList extends Component {
    handleClick(v) {
        this.props.history.push(`/chat-to/${v._id}`);
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        if (this.props.userList.list.length == 0) {
            return null
        }
        //过滤出已完善个人信息的用户
        const userList = this.props.userList.list.filter(v => v.avatar);
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
