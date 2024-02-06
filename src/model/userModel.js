const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("user",{
        emailId:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate: {
            isEmail: true,
            },
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull:false,
        }
        
    },{
        hooks:{
            beforeCreate: async(user)=>{
                if(user.password){
                    const salt =  bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async(user)=>{
                if (user.password) {
                    const salt = bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        },
        instanceMethods: {
            validPassword: (password) => {
             return bcrypt.compareSync(password, this.password);
            }
           }
    })
    User.prototype.validPassword =  (password, hash) => {
        return  bcrypt.compareSync(password, hash);
    }
    return User;
}
