const express = require('express');
//模块化router
const userRouter = express.Router();
//引入mogoose的model;
const model = require('./model');
const User = model.getModel('user');
//设置查找的过滤条件,返回的doc将不包含以下设置属性
const _filter = {__v: 0, pwd: 0}
//密码简单加密,使密码不明文存储
// const utility = require('utility');

userRouter.get('/test', (req, res) => {
    User.find({}, _filter, (err, doc) =>{
        console.log('doc',doc)
        res.json({code:0, data: doc});
    })
    // User.remove({},function(){});
});


userRouter.get('/info', (req, res) => {
    const {userid} = req.cookies;
    if(!userid) {
        return res.json({code: 1});
    } else {
        User.findOne({_id: userid}, _filter, (err, doc) => {
            if(err) {
                return res.json({code:1, msg: '后端出错'});
            };
            return  res.json({code:0, data: doc});
        })
    }
});

userRouter.post('/login', (req, res)=> {
    const {user, pwd} = req.body;
    //返回对象不包含type
    User.findOne({user, pwd: pwd}, _filter, (err, doc) => {
        if(!doc) {
            return res.json({code:1, msg:"用户名或密码错误"});
        } else {
            //设置cookie的参考量，以唯一标示量_id进行设置
            res.cookie('userid', doc._id);
            return res.json({code:0, data: doc});
        };
    })
});

userRouter.post('/register', (req, res)=> {
    const {user, pwd, type} = req.body;
    //返回对象不包含type
    User.findOne({user}, (err, doc) => {
        if(doc) {
            return res.json({code:1, msg:"该用户名已存在"});
        } 
        else {
            User.create({user, pwd: pwd, type}, (err, doc) => {
                if(err) {
                    return res.json({code:1, msg: "后端出错"});
                } else {
                    res.cookie('userid', doc._id);
                    const {_id, user, type} = doc;
                    return res.json({code:0, data: {_id, user, type}});
                };
            });
        };
    });
});

userRouter.post('/update', (req, res)=> {
    const {userid} = req.cookies;
    if(!userid) {
        return res.json({code:1});
    } else {
        User.findByIdAndUpdate(userid, req.body, (err, doc) => {
            if (err) {
                return res.json({code: 1, msg: "后端出错"})
            };
            const {user, type, avatar, _id} = doc;
            const data = {user, type, avatar, _id, ...req.body};
            return res.json({code: 0, data});

        })
    }    
});
//密码简单加密函数
// function md5Pwd(pwd) {
//     const salt = 'sfnkjdsg_wqr917463265%……%&*197GFYAGK@4362988723em￥……%%&';
//     return utility.md5(utility.md5(pwd + salt));
// };

module.exports = userRouter;