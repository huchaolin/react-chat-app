//action
const STORE_MSG = 'STORE_MSG';
//initState
const initState = {
    msgs:[]

}
//reducer
export function chat(state = initState, action) {
    switch(action.type) {
        case STORE_MSG:
            return {...state, msgs:[...state.msgs, action.payload]}
        default:
            return state;
    }
}

//action creater
function storeMsg(msg) {
   return {type: STORE_MSG, payload: msg}
};

export function handleSubmit({from, to, msg}) {
    return (dispatch, getState) => {
        //正在聊天的双方用户_id组成的唯一标识
    const chatid = [from, to].sort().join('');
    const date = new Date();
    const chatmsg = {chatid, from, to, msg, date: date.getTime()}
         dispatch(storeMsg(chatmsg));
    }
}