import React, {Component} from 'react';
import {List, Badge} from 'antd-mobile';
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
        // console.log('msg-userid',userid)
        const users = this.props.userList.usersBook;
        // console.log('msg-users',users)
        const  msgs = this.props.chat.msgs;
        // console.log('msg-msgs',msgs)
        const msgsBook = {};
        // console.log('msg-msgsBook',msgsBook)
        if(!users || msgs.length == 0) {
            console.log('msg-未获得需要数据，返回空白')
            return null
            
        };
        // console.log('msg-继续渲染')
        
        msgs.map(v => {
            const chatUserId = v.from == userid ? v.to : v.from;
            msgsBook[chatUserId] = msgsBook[chatUserId] ? [...msgsBook[chatUserId], v] : [v];
        });
        // console.log('msg-msgsBook',msgsBook)
        for(let id in msgsBook) {
        msgsBook[id].sort( (v1, v2) => v2.date - v1.date);
        };
        const msgsArr = Object.entries(msgsBook);
        // console.log('msg-msgsArr',msgsArr)
        //将收到的最新消息显示在最上方
        msgsArr.sort((v1, v2) => v2[1][0].date - v1[1][0].date);
        
        return (<List>
                     {msgsArr.map((v, i) => {
                        const chat_msgs = v[1];
                        // console.log('msg-chat_msgs',chat_msgs)
                        const chat_id = v[0];
                        // console.log('msg-chat_id',chat_id)
                        const avatar = require(`../avatarSelector/img/${users[chat_id].avatar}.png`);
                        // console.log('msg-avatar',avatar)
                        const userName = users[chat_id].user;
                        // console.log('msg-userName',userName)
                        const message = chat_msgs[0].msg;
                        const sendTime = chat_msgs[0].date;
                        // console.log('msg-messags',message)
                        let unRead = 0;
                        chat_msgs.forEach(msg => {
                                if(msg.from !== userid) {
                                    !msg.isRead ? unRead++ : null;
                                }
                        });
                        // console.log('msg-unread',unRead)

                        return ( 
                            <Item   style={{marginTop:'5px'}}
                                    key={i} 
                                    thumb={<div>
                                                <div>
                                                    <img style={{width:'40px', height:'40px'}}  alt='' src={avatar}/>
                                                </div>
                                                <div style={{marginTop:'5px', 
                                                            textAlign:'center', 
                                                            fontSize:'14px', 
                                                            fontWeight:'bold'}}>{userName}
                                                </div>
                                          </div>}
                                    extra={<Badge text={unRead} overflowCount={99} />}
                                    onClick={() => {
                                        this.props.history.push(`/chat-to/${chat_id}`);
                                        this.handleClick(chat_id);
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