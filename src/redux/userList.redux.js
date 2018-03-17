import axios from 'axios';
import {Toast} from 'antd-mobile';

const initState = {
    userList: null,
    msg: ''
};
//action
const USER_LIST = 'USER_LIST';
const ERR_MSG = 'ERR_MSG';

//reducer 
export function userList(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, list: action.payload, msg: ''};
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

export function getUserList(type) {
	return dispatch=>{
		axios.get(`/user/list?type=${type}`)
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					return dispatch(updateUserList(res.data.data))
                } else {
                    return dispatch(errorMsg(res.data.msg));
                }
			})
	}
}