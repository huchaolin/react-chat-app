const mongoose = require('mongoose');
// 链接mongo 并且使用react-chat-app这个集合
const DB_URL = 'mongodb://localhost:27017/react-chat-app';
mongoose.connect(DB_URL);