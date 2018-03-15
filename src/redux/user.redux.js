import axios from 'axios';
import {Toast} from 'antd-mobile';
import {getRedirectPath} from '../utils';

//action
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERR_MSG = 'ERR_MSG';
//reducer
const INIT_STATE = {
    user: '',
    type: '',
    msg: '',
    //跳转的路由
    redirectTo:''
};
export function user(state = INIT_STATE, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return  {...state, ...action.payload, redirectTo: getRedirectPath(action.payload), msg:''};
        case ERR_MSG:
            return {...state, msg: action.msg};
        default:
            return state;
    }
}
//action creater
function authSuccess(data) {
    return {type: AUTH_SUCCESS, payload: data};
};

function errorMsg(msg) {
    msg ? Toast.info(`${msg}`, 2) : null;
    return {msg, type: ERR_MSG};
};

export function handleLogin(data) {
    const {user, pwd} = data;
    if (!user || !pwd) {
        return errorMsg('请填写用户名或密码');
    }
    //异步请求axios
    return dispatch => {
    axios.post('/user/login', {user, pwd})
        .then( res => {
            if( res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            }
            else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
};
export function handleRegister(data) {
    const {user, pwd, pwd2, type} = data;
    if(!user || !pwd || !pwd2) {
        return errorMsg('用户名或密码未填写');
    }
    if (pwd !== pwd2) {
        return errorMsg('两次密码不一致');
    }
    //异步请求axios
    return dispatch => {
    axios.post('/user/register', {user, pwd, type})
        .then( res => {
            if( res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            }
            else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
};

export function update(data) {
    const {avatar} = data; 
    if(!avatar) {
        return errorMsg("请选择头像");
    }
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                }
                else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}