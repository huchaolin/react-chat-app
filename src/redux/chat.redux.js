import io from 'socket.io-client';
import axios from 'axios';
// import {Toast} from 'antd-mobile';
//建立socket连接  
const socket = io('ws://localhost:9093'); 

//action
//receive message
const RCV_MSG = 'RCV_MSG';
const GET_MSG ='GET_MSG';
const UPDATE_MSG = 'UPDATE_MSG';
const LOGOUT = 'LOGOUT';
const ERR_MSG = 'ERR_MSG';
//initState
const initState = {
    msgs:[],
    unRead: null,
    hasGetMsgs: false
}
//reducer
export function chat(state = initState, action) {
    switch(action.type) {
        case GET_MSG:
            return {...state, msgs:action.payload, hasGetMsgs: true}
        case UPDATE_MSG:
            return {...state, msgs: action.payload};
        case RCV_MSG:
            return {...state, msgs: [...state.msgs, action.payload]} ;
        case LOGOUT:
            return {...initState};
        case ERR_MSG:
            return {error:action.payload};
        default:
            return state;
    }
}

//action creater
function getMsg(msgs) {
    return {type:GET_MSG, payload:msgs}
}
function receiveMsg(msg) {
    return {type: RCV_MSG, payload: msg}
};

function updateMsg(msgs) {
    return {type: UPDATE_MSG, payload: msgs}
};


function errorMsg(msg) {
    return {payload: msg, type: ERR_MSG};
};
//获取后端存储的聊天信息 
export function getMessages() {
    //使用async改写axios
    return async dispatch => {
        const res = await axios.get('/user/chatmsgs');
        if (res.status === 200 && res.data.code === 0) {
            return dispatch(getMsg(res.data.data))
        } else {
            return dispatch(errorMsg(res.data.msg));
        }
    };
};

//发送消息
export function handleSubmit({from, to, msg}) {
    return (dispatch, getState) => {
        //正在聊天的双方用户_id组成的唯一标识
    const chatid = [from, to].sort().join('');
    const date1 = new Date();
    console.log('前端发送date',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
    const chatmsg = {chatid, from, to, msg, isRead: false}
    socket.emit('sendMsg', chatmsg);
    }
}


//开始socket 事件监听,,收到消息就更新state
export function startListen() {
    return (dispatch, getState)=> {
        socket.on('receiveMsg', data => {
            const date1 = new Date();
            console.log('data', data);
    console.log('前端收到date',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
            
            const userid = getState().user._id;
            let msgs = getState().chat.msgs;
            console.log('msgs',msgs);
            const {chatid, _id} = data;
            //确保存储的聊天内容只与用户本人相关
            if(chatid.indexOf(userid) > -1) {
            !msgs.length ? dispatch(receiveMsg(data)) : (msgs[msgs.length - 1]._id !== _id) ? dispatch(receiveMsg(data)) : null ;
            }
        })
    }
};

export function updateReadMsg(chat_to_id) {
    return (dispatch, getState) => {
        const userid = getState().user._id;
        const chatid = [userid, chat_to_id].sort().join('');
        const msgs = getState().chat.msgs.map(v => {
            if(v.chatid == chatid && v.from == chat_to_id) {
                if(v.isRead == false) {
                    v.isRead = true;
                    //向后端更新isRead状态
                    axios.post('/user/update/readmsgs', {updateRead: v}).then(res => console.log('redmsg-res',res))
                }
            };
            return v;
        });
        dispatch(updateMsg(msgs));
    }
} ;

export function chatLogout() {
    return {type: LOGOUT};
};