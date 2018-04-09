import express from 'express';
import models from './model';
import userRouter from './user';
import path from 'path';
//处理post
import bodyParser from 'body-parser';
//处理cookie
import cookieParser from 'cookie-parser';
//ssr
// import pageHtml from './ssrCode.js';

const app = express();
const Chat = models.getModel('chat');
const User = models.getModel('user');

//中间件
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

// //新增中间件处理路径问题
app.use((req, res, next) => {
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next();
  };
  return res.sendFile(path.resolve('build/index.html'));
//   return res.sendFile(pageHtml);
});
// //设置静态资源的地址 
app.use('/',  express.static(path.resolve('build')));



// work with socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', socket => { 
    socket.on('sendMsg', data => {
      let date1 = new Date();
      console.log('后端收到时间',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
      const {chatid, from, to, msg, isRead} = data;
      Chat.create({chatid, from, to, msg, isRead}, (err, doc) => {
        let date1 = new Date();
        console.log('后端发送时间',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
        io.emit('receiveMsg', doc);
      });
    });
    socket.on('readMsg', readMsg => {
      Chat.findByIdAndUpdate(readMsg._id, readMsg, (err, doc) => {
        if (err) {
           return io.emit('updateRead', {code: 1, msg: "后端出错"});
        };
        const doc1 = {...doc, ...readMsg};
        io.emit('updateRead', {code: 0, data: doc1});
      });
   });
   // 及时更新用户列表的信息
   app.post('/user/update', (req, res)=> {
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
                io.emit('updateUserList', data);
                return res.json({code: 0, data});
            })
        }    
    });
});



  server.listen(9093, () => {
  console.log('node app start at port 9093')
}); 