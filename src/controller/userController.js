const {db} = require('../model');
const {validateObject} = require('../util/util')
const User = db.users;
const bcrypt = require("bcryptjs");
const{verifyBasicAuth} = require('../middleware/authenticate');
const {logger} = require('../logger/logger')
const createUser = async(req,res)=>{
    try{
       
         if(Object.keys(req.query).length>0){
            res.status(400).send();
   }
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

       logger.log({
        level: 'info',
        message: ' User Created'
       })
        res.status(201).json({
            emailId:response.emailId,
            firstName:response?.firstName,
            lastName:response?.lastName,
            createdAt: response?.createdAt,
            updatedAt: response?.updatedAt
        });
    }catch(err){
        console.log(err);
        res.status(400).send();
    }
}

const updateUser = async(req,res)=>{
    try{
       
        if(Object.keys(req.query).length>0){
            res.status(400).send();
           }
        //handle empty body
        if(!req.headers){
            res.status(401).send();
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

        if(Object.keys(req.body).length == 0){
            res.status(400).send();
        }
       for(key in req.body){
        user[key] = req.body[key];
       }
       if (user?.password) {
        const salt = bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user?.password, salt);
    }
       const response = await User.update(user,{where:{emailId: clientCredentials.emailId}});
       console.log(response);
       logger.log({
        level: 'info',
        message: ' User Updated'
       })
       res.status(204).send();
    }
    catch(err){
        console.log(err);
        res.status(400).send();
    }
}

//add body validation
const getUser = async(req,res)=>{
    try{
       
        if(Object.keys(req.query).length>0){
            res.status(400).send();
           }
        if(!req.headers){
            res.status(401).send();
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
        if(req.is("*/*")){
            return res.status(400).send();
        }
        res.status(200).json({
            emailId:authenticatedUser.emailId,
            firstName:authenticatedUser?.firstName,
            lastName:authenticatedUser?.lastName,
            createdAt: authenticatedUser?.createdAt,
            updatedAt: authenticatedUser?.updatedAt
        });

    }catch(err){
        console.log(err);
        res.status(500).send();
    }
}

module.exports = {createUser,updateUser,getUser};
