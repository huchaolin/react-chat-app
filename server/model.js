const mongoose = require('mongoose');
// 链接mongoDB 并且使用react-chat-app这个集合
const DB_URL = 'mongodb://localhost:27017/react-chat-app';
mongoose.connect(DB_URL);
//使用mongoose对mongoDB进行增删查改

//定义model
const models = {
    user: {
        user: {type: String, reqiure: true},
        pwd: {type: String, reqiure: true},
        type: {type: String, reqiure: true},
        //头像
        avatar: {type: String},
        //个人简介或职位简介
        desc: {type: String},
        //职位名
        job: {type: String},
        //如果是BOSS，还有两个
        //money
        money: {type: String},
        //公司简介
        company: {type: String}
    },
    chat:{
        //每一个聊天唯一的标识
		chatid: {type: String, require: true},
		from: {type: String,require: true},
		to: {type: String, require: true},
		isRead: {type: Boolean, default: false},
		content: {type: String, require: true, default:''},
		create_time: {type:Number, default: Date.now}
	}
}
//创建model
for(let model in models) {
    mongoose.model(model, new mongoose.Schema(models[model]))
};

module.exports = {
    getModel(model) {
        return mongoose.model(model);
    }
}

