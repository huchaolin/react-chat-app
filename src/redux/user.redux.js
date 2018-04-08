import axios from 'axios';
// import {Toast} from 'antd-mobile';
import {getRedirectPath} from '../utils';

//action
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERR_MSG = 'ERR_MSG';
const LOGOUT = 'LOGOUT';
const CHANGE_INFO = 'CHANGE_INFO';
//reducer
const initState = {
    user: '',
    type: '',
    avatar: '',
    job: '',
    msg: '',
    //跳转的路由
    redirectTo:'',
    //唯一标识
    _id: '',
    desc: '',
    company: ''
    
};
export function user(state = initState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return  {...state, ...action.payload, redirectTo: getRedirectPath(action.payload), msg:''};
        case CHANGE_INFO: 
            return {...state, redirectTo:`/${state.type}info`}
        case ERR_MSG:
            return {...state, msg: action.msg};
        case LOGOUT:
            return {...initState};
        default:
            return state;
    }
};
//action creater
function authSuccess(data) {
    return {type: AUTH_SUCCESS, payload: data};
};
function errorMsg(msg) {
    return {msg, type: ERR_MSG};
};
export function changeInfo() {
    return {type: CHANGE_INFO};
}

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
    };
    if (pwd !== pwd2) {
        return errorMsg('两次密码不一致');
    };
    if(!type) {
        return errorMsg("请选择身份");
    };
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
    };
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
};
export function userLogout() {
    return {type: LOGOUT};
};

export function loadData(data) {
    return dispatch => {
        return dispatch(authSuccess(data));
    }
}