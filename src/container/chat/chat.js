import React, {Component} from 'react';
import { NavBar, Icon, List, InputItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {handleSubmit} from '../../redux/chat.redux';

@connect(state => state, {handleSubmit})
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    render() {return (<div>       
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.goBack()}}
        >{`chat to userid`}</NavBar>
        <div>
            {this.props.chat.msgs.map( (v, i) => {
                return <div key={i}> {v.msg}</div>
            })}
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