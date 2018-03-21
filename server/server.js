const express = require('express');
const app = express();
const userRouter = require('./user');
const models = require('./model');
const Chat = models.getModel('chat');
const User = models.getModel('user');
//处理post
const bodyParser = require('body-parser');
//处理cookie
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

// work with socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', socket => { 
    socket.on('sendMsg', data => {
      let date1 = new Date();
      console.log('后端收到时间',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
      const {chatid, from, to, msg, date, isRead} = data;
      Chat.create({chatid, from, to, msg, date, isRead}, (err, doc) => {
        // const {chatid, from, to, msg, date, isRead, _id} = doc;
        console.log('doc', doc)
        let date1 = new Date();
        console.log('后端发送时间',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
    
        io.emit('receiveMsg', doc);
      })
    })
});



  server.listen(9093, () => {
  console.log('node app start at port 9093')
}); 