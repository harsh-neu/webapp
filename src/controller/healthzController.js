const {db,connectDb} = require('../model/index');
const {logger} = require('../logger/logger')
const gethealthCheck = async(req,res)=>{
  if(Object.keys(req.query).length>0){
    logger.log({
      level: 'error',
      label:"Healthz data",
      message: `Invalid req`,
      httpRequest:{
          httpMethod:`${req.method}`,
      }
     })
     res.status(400).send();
   }
    res.set({
        'X-Content-Type-Options':'nosniff',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma':'no-cache'
        });
        if(req.is("*/*")){
          logger.log({
            level: 'error',
            label:"Healthz data",
            message: `Invalid req`,
            httpRequest:{
                httpMethod:`${req.method}`,
            }
           })
          res.status(400).send();
        }

        
      try{
       const data =   await connectDb();
       if(data == "error"){
        logger.log({
          level: 'error',
          label:"Healthz data",
          message: `Failed to connect to Database`,
          httpRequest:{
              httpMethod:`${req.method}`,
          }
         })
        throw new Error("Database Failed to connect");
       
       }
      
      
       logger.log({
        level: 'info',
        label:"Healthz data",
        message: `success`,
        httpRequest:{
            httpMethod:`${req.method}`,
        }
       })
        res.status(200).send();
         
      }
      catch(err){
        logger.log({
          level: 'error',
          label:"Healthz data",
          message: `Invalid req`,
          httpRequest:{
              httpMethod:`${req.method}`,
          }
         })
        console.log(err,'err');
       
        return res.status(503).send();
      }
   
}

const healthCheck = (req,res)=>{

  logger.log({
    level: 'error',
    label:"Healthz data",
    message: `Invalid request`,
    httpRequest:{
        httpMethod:req.method,
    }
   })
    res.set({
        'X-Content-Type-Options':'nosniff',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma':'no-cache'
        });
    res.status(405).send();
}

module.exports = {gethealthCheck,healthCheck}
