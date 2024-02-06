const express = require('express');
const router = express.Router();

const healthzRouter = require('./healthz.route');
const userRouter = require('./user.route');

module.exports =  function(app){
    app.use("/healthz",healthzRouter);
    app.use("/user",userRouter);
}
