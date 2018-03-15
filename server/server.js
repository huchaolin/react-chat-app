const express = require('express');
const app = express();
const userRouter = require('./user');
//处理post
const bodyParser = require('body-parser');
//处理cookie
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);


  app.listen(9093, function(){
  console.log('node app start at port 9093')
}); 