import React, {Component} from 'react';
import {List, Badge, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {updateReadMsg} from '../../redux/chat.redux';
import  moment from 'moment';

@connect(state => state, {updateReadMsg})
class MsgList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(chat_to_id) {
        this.props.updateReadMsg(chat_to_id);
    }
    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        console.log('msg-userid',userid)
        const users = this.props.userList.usersBook;
        console.log('msg-users',users)
        const  msgs = this.props.chat.msgs;
        console.log('msg-msgs',msgs)
        const msgsBook = {};
        console.log('msg-msgsBook',msgsBook)
        if(msgs.length == 0) {return null};
        msgs.map(v => {
            if(v.from !== userid) {
                    msgsBook[v.from] = msgsBook[v.from] ? [...msgsBook[v.from], v] : [v];
            }; 
        });
        console.log('msg-msgsBook',msgsBook)
        for(let from in msgsBook) {
        msgsBook[from].sort( (v1, v2) => v2.date - v1.date);
        };
        const msgsArr = Object.entries(msgsBook);
        console.log('msg-msgsArr',msgsArr)
        //将收到的最新消息显示在最上方
        msgsArr.sort((v1, v2) => v2[1][0].date - v1[1][0].date);
        
        return (<List>
                     {msgsArr.map((v, i) => {
                        const from_msgs = v[1];
                        console.log('msg-from_msgs',from_msgs)
                        const from_id = v[0];
                        console.log('msg-from_id',from_id)
                        const avatar = require(`../avatarSelector/img/${users[from_id].avatar}.png`);
                        console.log('msg-avatar',avatar)
                        const userName = users[from_id].user;
                        console.log('msg-userName',userName)
                        const message = from_msgs[0].msg;
                        const sendTime = from_msgs[0].date;
                        console.log('msg-messags',message)
                        let unRead = 0;
                        from_msgs.forEach(msg => {
                                !msg.isRead ? unRead++ : null;
                        });
                        console.log('msg-unread',unRead)

                        return ( 
                            <Item   style={{marginTop:'5px'}}
                                    key={i} 
                                    thumb={<div>
                                                <div>
                                                    <img style={{width:'40px', height:'40px'}} src={avatar}/>
                                                </div>
                                                <div style={{marginTop:'5px', 
                                                            textAlign:'center', 
                                                            fontSize:'14px', 
                                                            fontWeight:'bold'}}>{userName}
                                                </div>
                                          </div>}
                                    extra={<Badge text={unRead} overflowCount={99} />}
                                    onClick={() => {
                                        this.props.history.push(`/chat-to/${from_id}`);
                                        this.handleClick(from_id);
                                    }}
                                    align='middle'
                                    > <span>{message}</span>
                                    <Brief>
                                        <span>{moment(sendTime).calendar()}</span>
                                    </Brief>
                            </Item>)
                    })}
            </List>)
    };
};
export default MsgList;