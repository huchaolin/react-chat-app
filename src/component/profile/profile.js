import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, WingBlank, Modal, Button} from 'antd-mobile';
import Cookies from 'js-cookie';
import {userLogout, changeInfo} from '../../redux/user.redux';
import {chatLogout} from '../../redux/chat.redux';
import {userListLogout} from '../../redux/userList.redux';
import './profile.css';
@connect(
	state => state,
	{userLogout, chatLogout, userListLogout, changeInfo}
)
class Profile extends Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.changeInfo = this.changeInfo.bind(this);
	}
	logout(){
		const alert = Modal.alert;
		alert('注销', '确认退出登录吗???', [
		      { text: '取消', onPress: () => console.log('cancel') },
		      { text: '确认', onPress: () => {
		      	Cookies.remove('userid');
				  this.props.userLogout();
				  this.props.chatLogout();
				  this.props.userListLogout();
				  this.props.history.push('/login');
		      }}
		    ])
	}
	changeInfo() {
		this.props.changeInfo();
		this.props.history.push(`/${this.props.user.type}info`)
	}
	render() {
		const user = this.props.user;
		console.log('user',user)
		const Item = List.Item;
		const Brief = Item.Brief;
		if(!user._id ) {return null};
		return (<div className='profile'>
				<Result
					img={<img src={require(`../avatarSelector/img/${user.avatar}.png`)} style={{width:50}} alt="" />}
					title={user.user}
					message={user.type == 'boss' ? user.company : null}
					buttonText={<Button type='ghost' inline size='small' >修改资料</Button>}
					onButtonClick={this.changeInfo}
				/>
				<List renderHeader={() => <span>简介</span>}>
					<Item
						multipleLine
					>
						{user.job}
						{user.desc.split('\n').map( (v, i) => <Brief key={i}>{v}</Brief>)}
						{user.money ? <Brief>薪资:{user.money}</Brief>:null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<div className='logout'>
					<List>
					<WingBlank>
							<Button  type='primary'  onClick={this.logout}>退出登录</Button>
					</WingBlank>
					</List>
				</div>
			</div>);
	}
}


export default Profile;
