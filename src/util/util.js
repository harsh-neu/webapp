 const validateObject = (obj,allowedKeys)=>{
    const keys = Object.keys(obj);
    const invalidKeys = keys.filter(key=> !allowedKeys.includes(key));
    if(invalidKeys.length >0){
        return false;
    }
    return true;
}

module.exports = {validateObject};
