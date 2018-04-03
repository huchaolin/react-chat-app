import React, {Component} from 'react';
import { NavBar, Icon, List, InputItem, Button, Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import moment from 'moment';
//渐变效果动画
import QueueAnim from 'rc-queue-anim';
import {handleSubmit, updateReadMsg} from '../../redux/chat.redux';
import './chat.css';

@connect(state => state, {handleSubmit, updateReadMsg})
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            pageCount: 1,
            msgSize: 9,
            isMore: true,
            lastDom: null
        };
        // //真实节点
        this.lastMsgDom = React.createRef();
        console.log('lastMsgDom', this.lastMsgDom)
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderChatContent = this.renderChatContent.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleSeeMore = this.handleSeeMore.bind(this);
        this.getRenderMsgs = this.getRenderMsgs.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.chat.msgs.length !== this.props.chat.msgs.length) {
            console.log('willReceiveProps更新已读消息')
            this.props.updateReadMsg(this.props.match.params.userid);
        };
        this.handleSetScrollDom(); 
    }
    componentDidMount() {
        if (this.props.chat.msgs.length > 0) {
            this.props.updateReadMsg(this.props.match.params.userid);
        };
        console.log('Didmount更新已读消息')
    }
    componentWillUpdate() {
        this.handleSetScrollDom();
    }
    componentDidUpdate() {
        this.handleMsgScroll();
    }
    handleMsgScroll() {
        const node = this.state.lastDom;
        node ? node.scrollIntoView() : null;
        console.log('node', node)
    }
    handleSetScrollDom() {
        //将ref没有置零前所指向的真实DOM节点存储起来
        const node = this.lastMsgDom.current;
        if((this.state.lastDom !== node) && node) {
            this.setState({lastDom: node});
        }
    }
    handleInput(v) {
        this.setState({
            msg: v
        })
        // console.log('this.state.msg', this.state.msg)
    }
    handleEnter(event) {
        event.preventDefault();
        this.handleSubmit();
    }
    handleSubmit() {
        // console.log(' msgs', this.props.chat.msgs)
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const msg = this.state.msg;
        const isNull = /^\s+$/g;
        if(isNull.test(msg) || msg == '') {
            return Toast.info('请输入消息', 2);
        }
        this.props.handleSubmit({from, to, msg});
        this.setState({msg:''});
    }
    handleSeeMore() {
        //增加一个判断，若消息已显示完，则pageCount不+1
       let msgs = this.getRenderMsgs(); 
       const pageCount = this.state.pageCount;
       const lastMsgsCount = pageCount * this.state.msgSize;
       if(msgs.length < lastMsgsCount) {
          return Toast.info('没有更多聊天记录了!', 3);
       };
        this.setState({
            pageCount: this.state.pageCount + 1
        });
    }
    getRenderMsgs() {
        if(!this.props.chat.msgs.length) {return null};
        const userid = this.props.user._id;
        const to_id = this.props.match.params.userid;
        const usersBook = this.props.userList.usersBook;
        const chatid = [userid, to_id].sort().join('');
        let msgs = this.props.chat.msgs.filter(v => v.chatid == chatid);
        if(!msgs.length) {return null};
        msgs.forEach( v => {
            v.avatar = userid == v.from ? this.props.user.avatar : usersBook[to_id].avatar;
        }) ; 
        return msgs;
    }
    renderChatContent({inputRef}) {
        let msgs= this.getRenderMsgs();
        if(!msgs) {return null};
        const userid = this.props.user._id;
        const to_id = this.props.match.params.userid;
        //增加查看本地聊天记录功能
        const pageCount = this.state.pageCount;
        const msgsCount = pageCount * this.state.msgSize;
        //取出时间最近的的给定数目的消息记录
        if(msgs.length > msgsCount ) {
            msgs = msgs.reverse().slice(0, msgsCount).reverse();
        } ;
        let time1 = null;
        let time2 = null;
       return  (<div>
           <QueueAnim duration={600} type='bottom'>
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
                            </div> : null 
                        }
                            <div 
                                ref = { index == ( msgs.length - 1 ) ? inputRef : null}
                                style= {{float: 'right', width: '100%', marginBottom: '5px', position:'relative'}}
                                >
                               <div className={`Chat-sender${isSelf ? ' self' : ''}`}>
                                    <img style={{width: '32px'}}alt='头像' src={avatar}></img>
                                </div>
                                <div className={`Chat-message${isSelf ? ' self' : ''}`}>
                                    {item.msg}
                                </div>
                                {isSelf ? <div className={'Chat-is-read'}> {item.isRead ? '已读' : '未读'}</div> : null}
                            </div>
                        </div>
                    );
                })
            }
            <br />
           </QueueAnim>
        </div>)
    }
    render() {
        const to_id = this.props.match.params.userid;
        const users = this.props.userList.usersBook;
        const Item = List.Item;
        if(!users || Object.keys(users).length === 0) {
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
            <div onClick={this.handleSeeMore} className='chat-see-more'>查看更多记录</div>
            {this.renderChatContent({inputRef: this.lastMsgDom})}
        </div>
        <div className="chat-footer">
            <List>
                <Item 
                    extra={<Button type='primary' inline size='small' onClick={this.handleSubmit}>发送</Button>}
                >
                <form onSubmit={ event => this.handleEnter(event)}>
                    <InputItem
                        value={this.state.msg}
                        placeholder="请输入"
                        type='text'
                        onChange={v => this.handleInput(v)}
                    ></InputItem>
                </form>
                </Item>
            </List>
        </div>
    </div>)
    }
}
export default Chat;