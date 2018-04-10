import io from 'socket.io-client';
import axios from 'axios';
//建立socket连接  
export const socket = io(`ws://${window.location.hostname}:9093`); 
console.log("window.location.hostname",window.location.hostname)
console.log('socket',socket)
//action
//receive message    
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
            return {...state, msgs: action.payload, hasGetMsgs: true}
        case UPDATE_MSG:
            return {...state, msgs: action.payload};
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

function updateMsg(msgs) {
    return {type: UPDATE_MSG, payload: msgs}
};

function errorMsg(msg) {
    return {payload: msg, type: ERR_MSG};
};
//获取后端存储的聊天信息 
export function getMessages() {
    //读取本地缓存聊天记录;
    //使用async改写axios
    return async (dispatch, getState) => {
        const userid = getState().user._id;
        const localMsgs = localStorage.getItem(`msg${userid}`) ? JSON.parse(localStorage.getItem(`msg${userid}`)) : [];
        console.log('localMsgs',localMsgs)
        const msgs = localMsgs.filter(v => v.isRead);
        //self 发出的消息存储于本地，退出前显示的对方未读
        const localUnRead = localMsgs.filter(v => {
           return (!v.isRead) && (v.from == userid);
        });
        //获取未读消息
        const res = await axios.post('/user/unread-msgs', localUnRead);
        if (res.status === 200 && res.data.code === 0) {
            const chatmsgs = [...msgs, ...res.data.data];
            //判断条件用于修复消息条数被重置为更少条数的情况
            if(chatmsgs.length >= localMsgs.length) {
                localStorage.setItem(`msg${userid}`, JSON.stringify(chatmsgs));
                console.log('getmessage-setItem', chatmsgs)

                return dispatch(getMsg(chatmsgs));
            };
            return null;
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


//开始socket 事件监听,收到消息就更新state
export function startListen() {
    // socket.connect();
    return (dispatch, getState)=> {
        const userid = getState().user._id;
        socket.on('receiveMsg', data => {
            
            const date1 = new Date();
    console.log('前端收到date',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
            let msgs = getState().chat.msgs;
            const {chatid, _id} = data;
            //确保存储的聊天内容只与用户本人相关
            if(chatid.indexOf(userid) > -1) {
                //本地缓存聊天记录
            //     if(msgs.length > 0) {
            //         msgs = msgs[msgs.length - 1]._id !== _id ? [...msgs, data] :  [...msgs];
            //     } else {
            //         msgs = [...msgs, data];
            //     }
                
            // localStorage.setItem(`msg${userid}`, JSON.stringify(msgs));
            // dispatch(updateMsg(msgs));    
            // !msgs.length ? dispatch(updateMsg(data)) : (msgs[msgs.length - 1]._id !== _id) ? dispatch(updateMsg) : null ;
                if(msgs.length == 0) {
                    msgs = [data];
                    dispatch(updateMsg([data]));
                    localStorage.setItem(`msg${userid}`, JSON.stringify(msgs));
                    console.log('receive-setItem', msgs)     
                } else if((msgs[msgs.length - 1]._id !== _id) ) {
                    msgs = [...msgs, data];
                    dispatch(updateMsg(msgs));
                    localStorage.setItem(`msg${userid}`, JSON.stringify(msgs));
                    console.log('receive-setItem', msgs)                
                };
            };
        });
        socket.on('updateRead', res => {
            const {chatid, _id} = res.data;
            if(!userid) {return null};
            //确保存储的聊天内容只与用户本人相关
            if(chatid.indexOf(userid) == -1) {
                return;
            };
            if(res.code == 1) {
                dispatch(errorMsg(res.msg));
            };
            const msgs =  getState().chat.msgs.map(v => {
                if(v._id == res.data._id) {
                    v.isRead = true;
                };
                return v;
            });
            localStorage.setItem(`msg${userid}`, JSON.stringify(msgs));
            console.log('updateRead-setItem', msgs) 
            dispatch(updateMsg(msgs));
        })
    }
};

export function updateReadMsg(chat_to_id) {
    return (dispatch, getState) => {
        const userid = getState().user._id;
        const chatid = [userid, chat_to_id].sort().join('');
        getState().chat.msgs.forEach(v => {
            if(v.chatid == chatid && v.from == chat_to_id) {
                if(v.isRead == false) {
                    v.isRead = true;
                    //向后端更新isRead状态
                    socket.emit('readMsg', v);
                };
            };
        });
    }
} ;

export function chatLogout() {
    // socket.close();
    window.location.reload();
    return {type: LOGOUT};
};


