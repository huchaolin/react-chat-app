import axios from 'axios';
import {Toast} from 'antd-mobile';

const initState = {
    list: [],
    msg: ''
};
//action
const USER_LIST = 'USER_LIST';
const ERR_MSG = 'ERR_MSG';


//reducer 
export function userList(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, list: action.payload, usersBook: getUsersBook(action.payload), msg: ''};
        case ERR_MSG:
            return {...state, msg: action.msg}
        default:
            return state;
    };
};
//action creater
function errorMsg(msg) {
    msg ? Toast.info(`${msg}`, 2) : null;
    return {msg, type: ERR_MSG};
};

function updateUserList(data) {
    return {type: USER_LIST, payload: data}
};

export function getUserList() {
	return (dispatch, getState)=>{
        const type = getState().user.type == 'boss' ? 'genius' : 'boss'; 
        console.log('userlist-type',type)
		axios.get(`/user/list?type=${type}`)
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					return dispatch(updateUserList(res.data.data))
                } else {
                    return dispatch(errorMsg(res.data.msg));
                }
			})
	}
};


 //用户字典
 function getUsersBook(list) {
    console.log('userList',list)
    let usersBook = {};
    if(list.length > 0) {
        console.log('userList',list)
        list.forEach(v => {
            usersBook[v._id] = v;
        }) 
        return usersBook;
    }
}