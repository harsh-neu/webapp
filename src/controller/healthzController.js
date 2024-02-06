const {db,connectDb} = require('../model/index');

const gethealthCheck = async(req,res)=>{
   
    res.set({
        'X-Content-Type-Options':'nosniff',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma':'no-cache'
        });
        if(req.is("*/*")){
          res.status(400).send();
        }
       
        
      try{
       const data =   await connectDb();
       if(data == "error"){
        throw new Error("Database Failed to connect");
       }
      
      
        
        res.status(200).send();
         
      }
      catch(err){
        console.log(err,'err');
       
        return res.status(503).send();
      }
   
}

const healthCheck = (req,res)=>{
    res.set({
        'X-Content-Type-Options':'nosniff',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma':'no-cache'
        });
    res.status(405).send();
}

module.exports = {gethealthCheck,healthCheck}
