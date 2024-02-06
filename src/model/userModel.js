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
        
    })
    return User;
}
