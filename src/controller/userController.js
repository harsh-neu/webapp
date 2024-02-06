const {db} = require('../model');

const User = db.users;


const createUser = async(req,res)=>{
    try{
        const user = {
            emailId: req.body.emailId ,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        const response = await User.create(user);
        console.log(user,"user")
        res.status(201).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json('Failed to create user');
    }
    


}

module.exports = {createUser};
