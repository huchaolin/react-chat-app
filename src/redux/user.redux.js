//action
const ADD_NUM ='ADD_NUM';
const M_NUM ='M_NUM';
//reducer
export function user(state=0, action) {
    switch(action.type) {
        case ADD_NUM:
            return  state + 1;
        case M_NUM:
            return state - 1;
        default:
            return state;
    }
}
//action creater
export function add() {
    return {type:ADD_NUM}
};

export function minus() {
    return {type:M_NUM}
}