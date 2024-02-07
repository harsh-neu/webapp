exports.verifyBasicAuth = (headers)=>{
    if(!headers.authorization){
        return false;
    }

    const encodedString =  headers.authorization.substring(6);
    const decodedString = Buffer.from(encodedString, 'base64').toString('ascii');
    console.log(decodedString,"demo str8ing");
    const [emailId,password] = decodedString.split(':');
    return {emailId,password};

}
