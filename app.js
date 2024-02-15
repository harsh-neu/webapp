const express = require ("express");
const bodyParser = require("body-parser");
const {connectDb} = require('./src/model/index');
require("dotenv").config();
const routes = require('./src/routes/index');
// const {createDb} = require('./database');
const app = express();


 
app.use(bodyParser.json());
app.use((err,req,res,next)=>{
    // res.set({
    //     'X-Content-Type-Options':'nosniff',
    //     'Cache-Control': 'no-cache, no-store, must-revalidate',
    //     'Pragma':'no-cache'
    //     });
    if(err){
        return res.status(400).send();
    }
    next();
})
routes(app);
app.get("/",(req,res)=>{
    res.json({message:"Welcome to Network structures And Cloud Computing"});
});
app.all('*', function(req, res){
    res.status(404).send();
  });
const PORT = process.env.PORT||3000;
const server = app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})

module.exports = {app,server}
