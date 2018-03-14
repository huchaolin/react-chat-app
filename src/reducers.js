// 合并所有reducer 并输出
import { combineReducers } from 'redux';
import { user } from './redux/user.redux';

export default combineReducers({user});