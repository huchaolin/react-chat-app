const express = require('express');
//模块化router
const userRouter = express.Router();

userRouter.get('/test', (req, res) => {
    res.json({test:"test"});
})
module.exports = userRouter;