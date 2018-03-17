//action
const CHAT_ID = 'CHAT_ID';
//initState
const initState = {
    chatid: null
}
//reducer
export function chat(state = initState, action) {
    switch(action.type) {
        case CHAT_ID:
            return {...state, chatid: action.payload}
        default:
            return state;
    }
}

//action creater
export function createChatId(id1, id2) {
    //正在聊天的双方用户_id组成的唯一标识
    const chatid = [id1, id2].sort().join();
    return {type: CHAT_ID, payload: chatid}
}