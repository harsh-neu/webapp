const {db} = require('../model');
const {validateObject} = require('../util/util')
const User = db.users;
const Verification = db.verification;
const bcrypt = require("bcryptjs");
const{verifyBasicAuth} = require('../middleware/authenticate');
const {logger} = require('../logger/logger');
const {publishMessage} = require('../pubsub/pubsub')
const createUser = async(req,res)=>{
    try{
       
         if(Object.keys(req.query).length>0){
            res.status(400).send();
            throw ({err:'Invalid Query',message:"The Query is Invalid"})
        }
        const userExists = await User.findOne({where:{emailId:req?.body?.emailId}});
        if(userExists){
            res.status(400).send();
            throw ({err:'User exists',message:`User with ${req.body.emailId} already exists`})
        }

        const user = {
            emailId: req.body.emailId ,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            verified: false
        }
       
        const response = await User.create(user);

       logger.info({
        label:"User Data",
        message: `User Created with id ${user.emailId}`,
        httpRequest:{
            httpMethod:'POST'
        }
       })
       if(process.env.ENVIRONMENT === "PRODUCTION"){
        await publishMessage(JSON.stringify(response));
       }
            
        res.status(201).json({
            id:response.id,
            emailId:response.emailId,
            firstName:response?.firstName,
            lastName:response?.lastName,
            createdAt: response?.createdAt,
            updatedAt: response?.updatedAt
        });
    }catch(err){
        logger.log({
            label:"User Creation",
            level: 'error',
            message: err.message,
            httpRequest:{
                httpMethod:'POST'
            }
           })
        console.log(err);
        res.status(400).send();
    }
}

const updateUser = async(req,res)=>{
    try{
       
        if(Object.keys(req.query).length>0){
            res.status(400).send();
            throw ({err:'Invalid Query',message:"The Query is Invalid"})
           }
        //handle empty body
        if(!req.headers){
            res.status(401).send();
            throw ({err:'Unauthenticated',message:"user is not authenticated"})
        }
        const clientCredentials = verifyBasicAuth(req.headers);
       
        if(!clientCredentials){
            res.status(401).send();
            throw ({err:'Unauthenticated',message:"user is not authenticated"})
        }
        const authenticatedUser =  await User.findOne({where:{emailId:clientCredentials.emailId}}); 
        if(!authenticatedUser){
            res.status(401).send();
            throw ({err:'Unauthenticated',message:"user is not authenticated"})
        }
        
        const correctPassword =  bcrypt.compareSync(clientCredentials.password,authenticatedUser.password);
        if(!correctPassword){
            res.status(401).send();
            throw ({err:'Unauthenticated',message:"user is not authenticated"})
        }
        if(process.env.ENVIRONMENT === "PRODUCTION"){
            if(!authenticatedUser.verified){
                res.status(403).send('Please Verify User');
            }
        }
       

        if(!validateObject(req.body,["firstName","lastName","password"])){
            res.status(400).send();
            throw ({err:'Invalid Query',message:"The Query is Invalid"})
        }
        const user = {};

        if(Object.keys(req.body).length == 0){
            res.status(400).send();
            throw ({err:'Invalid Query',message:"The Query is Invalid"})
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
        message: `User ${clientCredentials.emailId} Updated`,
        httpRequest:{
            httpMethod:'PUT'
        }
       })
       res.status(204).send();
    }
    catch(err){
        logger.log({
            label:"User Update",
            level: 'error',
            message: err?.message,
            httpRequest:{
                httpMethod:'PUT'
            }
           })
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
            throw ({err:'Unauthenticated',message:"user is not authenticated"})
        }
        const clientCredentials = verifyBasicAuth(req.headers);
       
        if(!clientCredentials){
            res.status(401).send();
            throw ({err:'Unauthenticated',message:"user is not authenticated"})

        }
        const authenticatedUser =  await User.findOne({where:{emailId:clientCredentials.emailId}}); 
        if(!authenticatedUser){
            res.status(401).send();
            throw ({err:'Unauthenticated',message:"user is not authenticated"})

        }
        if(process.env.ENVIRONMENT === "PRODUCTION"){
            if(!authenticatedUser.verified){
                res.status(403).send('Please Verify User');
            }
        }
        const correctPassword =  bcrypt.compareSync(clientCredentials.password,authenticatedUser.password);
        if(!correctPassword){
            res.status(401).send();
            throw ({err:'Unauthenticated',message:"user is not authenticated"})

        }
        if(req.is("*/*")){
            res.status(400).send();
            throw ({err:'Invalid Query',message:"The Query is Invalid"})

        }
        logger.log({
            label:"User Fetch",
            level: 'info',
            message: `User ${clientCredentials.emailId} fetched`,
            httpRequest:{
                httpMethod:'Get'
            }
           })
        res.status(200).json({
            id:authenticatedUser.id,
            emailId:authenticatedUser.emailId,
            firstName:authenticatedUser?.firstName,
            lastName:authenticatedUser?.lastName,
            createdAt: authenticatedUser?.createdAt,
            updatedAt: authenticatedUser?.updatedAt
        });

    }catch(err){
        logger.log({
            label:"User Fetch",
            level: 'error',
            message: err?.message,
            httpRequest:{
                httpMethod:'Get'
            }
           })
        console.log(err);
        res.status(500).send();
    }
}

const verify = async(req,res)=>{
    try{
        console.log(req);
        const {token} = req.query;
        if(!token){
            res.status(400).send('Invalid req');
        }
        console.log(token);
        const verificationEntry = await Verification.findOne({ where: { uuid: token } });
        if (!verificationEntry) {
            return res.status(403).send('Invalid token');
        }
    
        const createdAtTime = new Date(verificationEntry.createdAt);
        const currentTime = new Date();
        const differenceInMilliseconds = currentTime - createdAtTime;
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    
        if (differenceInMinutes >= 2) {
            logger.log({
                label: "User Fetch",
                level: 'error',
                message: 'Verification link expired',
                httpRequest: {
                    httpMethod: 'Get'
                }
            });
            return res.status(403).send('Link expired');
        }
    
        const verified = { verified: true };
        await User.update(verified, { where: { emailId: verificationEntry.emailId } });
        return res.status(200).send('Verification successful');

    }
    catch(err){
        console.log(err);
    }

}

module.exports = {createUser,updateUser,getUser,verify};
