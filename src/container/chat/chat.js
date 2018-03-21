import React, {Component} from 'react';
import { NavBar, Icon, List, InputItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import moment from 'moment';
import {handleSubmit, startListen} from '../../redux/chat.redux';
import './chat.css';

@connect(state => state, {handleSubmit, startListen})
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderChatContent = this.renderChatContent.bind(this);
    }
    componentWillMount() {
        if(this.props.chat.msgs.length < 1) {
            this.props.startListen();    
        };   
    }
    componentDidMount() {
        if(this.props.chat.msgs.length < 1) {
            this.props.startListen();    
        };
    }
    handleInput(v) {
        this.setState({
            msg: v
        })
        console.log('this.state.msg', this.state.msg)
    }
    handleSubmit() {
        console.log(' msgs', this.props.chat.msgs)
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
		const msg = this.state.msg;
        this.props.handleSubmit({from, to, msg});
    }
    renderChatContent() {
        if(!this.props.chat.msgs.length) {return null};
        const userid = this.props.user._id;
        const to_id = this.props.match.params.userid;
        const usersBook = this.props.userList.usersBook;
        const chatid = [userid, to_id].sort().join('');
        const msgs = this.props.chat.msgs.filter(v => v.chatid == chatid);
        if(!msgs.length) {return null};
        msgs.forEach( v => {
            v.avatar = userid == v.from ? this.props.user.avatar : usersBook[to_id].avatar;
        }) ; 
        const Item = List.Item; 
        let time1 = null;
        let time2 = null;
       return  (<div>
              {msgs.map((item, index) => {
                    let showTime = false;
                    const isSelf =  item.from == userid;
                    const avatar = require(`../../component/avatarSelector/img/${item.avatar}.png`);
                    if(index == 0) {
                        showTime = true;
                    }
                    if(index > 0) {
                         time1 = item.date;
                         time2 = msgs[index - 1].date;
                         moment(time1).subtract(3, 'minutes').isBefore(time2) ? (showTime = false) : (showTime = true);
                    };
                    return (
                        <div
                            style={{
                                textAlign: isSelf ? 'right' : 'left',
                                marginBottom: 12,
                                position:'relative'
                            }}
                            key={index} 
                        >  
                        { showTime ? 
                            <div style={{textAlign:'center'}}>
                                <div className="Chat-time-remindner">
                                    {moment(item.date).calendar()}
                                </div>
                            </div> : null }
                            <div style= {{float:' right', width:'100%'}}>
                               <div className={`Chat-sender${isSelf ? ' self' : ''}`}>
                                    <img style={{width:'32px'}}alt='头像' src={avatar}></img>
                                </div>
                                <div className={`Chat-message${isSelf ? ' self' : ''}`}>
                                    {item.msg}
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            <br />
        </div>)
    }
    render() {
        const to_id = this.props.match.params.userid;
        const users = this.props.userList.usersBook;
        
        if(Object.keys(users).length === 0) {
            return null;
        };
        return (<div>    
        <div className='chat-head'>
            <NavBar
            icon={<Icon type="left" />}   
            onLeftClick={() => {this.props.history.goBack()}}
            >{`正在与 ${users[to_id].user } 聊天`}
            </NavBar>
        </div>   
        <div className='chat-body'>
            {this.renderChatContent()}
        </div>
        <div className="chat-footer">
            <InputItem
                placeholder="请输入"
                onChange={v => this.handleInput(v)}
                extra={<span onClick={this.handleSubmit}>发送</span>}
            ></InputItem>
        </div>
    </div>)
          

    }
}
export default Chat;