import React, {Component} from 'react';
import {List, Badge} from 'antd-mobile';
import {connect} from 'react-redux';

@connect(state => state, null)
class MsgList extends Component {
    render() {
        const Item = List.Item;
        const Brief = List.Brief;
        const userid = this.props.user._id;
        const users = this.props.userList.usersBook;
        //按chatid生成字典
        let msgsBook = {};
        if(this.props.chat.msgs.length == 0) return null;
        this.props.chat.msgs.map(v => {
            if(v.from !== userid) {
                if(!v.isRead) {
                    msgsBook[v.from] = msgsBook[v.from] ? [...msgsBook[v.from], v] : [v];
                };
            }
        });
        for(let from in msgsBook) {
            msgsBook[from].sort( (v1, v2) => v2.date - v1.date);
        };
        const msgsArr = Object.entries(msgsBook);
        //将收到的最新消息显示在最上方
        msgsArr.sort((v1, v2) => v2[1][0].date - v1[1][0].date)
        return (<div>
            <List>
               {
                   msgsArr.map(v => {
                       const chatmsgs = v[1];
                       const from_id = v[0];
                       let unRead = 0;
                       chatmsgs.forEach(v => {
                            !v.isRead ? unRead++ : null;
                       });
                       
                       return ( <Item
                        key={from_id}
                        thumb={require(`../avatarSelector/img/${users[from_id].avatar}.png`).default}
                        extra={<Badge text={unRead} overflowCount={99} />}
                        onClick={() => {this.props.history.push(`/chat-to/${from_id}`)}}
                    >{users[from_id].user}
                        <Brief>{chatmsgs[0].msg}</Brief>
                    </Item>)
                   })
               }
            </List>
        </div>)
    }
};
export default MsgList;