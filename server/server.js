const express = require('express');
const app = express();
const userRouter = require('./user');


app.get('/test', (req, res) => {
    res.json({name:"mike", id: 2131});
});

app.use('/user', userRouter);
app.listen(9093, function(){
  console.log('node app start at port 9093')
});