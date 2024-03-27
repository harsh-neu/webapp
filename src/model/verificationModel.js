module.exports = (sequelize, DataTypes) =>{
    const verification = sequelize.define("verification",{
        uuid:{
            type: DataTypes.UUID,
            allowNull:false,
            unique:true,
            primaryKey: true
        },
        emailId:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate: {
            isEmail: true,
            },
        },
    });
    return verification;
}
