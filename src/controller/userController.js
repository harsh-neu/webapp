const {db} = require('../model');
const {validateObject} = require('../util/util')
const User = db.users;
const bcrypt = require("bcrypt");
const{verifyBasicAuth} = require('../middleware/authenticate');

const createUser = async(req,res)=>{
    try{
        const userExists = await User.findOne({where:{emailId:req?.body?.emailId}});
        if(userExists){
            res.status(400).send();
        }

        const user = {
            emailId: req.body.emailId ,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
       
        const response = await User.create(user);
        console.log(user,"user")
        res.status(201).json({
            emailId:response.emailId,
            firstName:response?.firstName,
            lastName:response?.lastName,
        });
    }catch(err){
        console.log(err);
        res.status(500).json('Failed to create user');
    }
}

const updateUser = async(req,res)=>{
    try{
        if(!req.headers){
            res.status(403).send();
        }
        const clientCredentials = verifyBasicAuth(req.headers);
       
        if(!clientCredentials){
            res.status(401).send();
        }
        const authenticatedUser =  await User.findOne({where:{emailId:clientCredentials.emailId}}); 
        if(!authenticatedUser){
            res.status(401).send();
        }
        
        const correctPassword =  bcrypt.compareSync(clientCredentials.password,authenticatedUser.password);
        if(!correctPassword){
            res.status(401).send();
        }
        if(!validateObject(req.body,["firstName","lastName","password"])){
            res.status(400).send();
        }
        const user = {};
        
       for(key in req.body){
        user[key] = req.body[key];
       }
       console.log(user);
       const response = await User.update(user,{where:{emailId:"harsh1@gmail.com"}});
       console.log(response);
       res.status(204).send();
    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}

module.exports = {createUser,updateUser};
