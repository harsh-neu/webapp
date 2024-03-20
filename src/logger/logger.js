
const winston = require('winston');
const {combine, timestamp,json} = winston.format;
// const myFormat = printf(({ level, message, label, timestamp }) => {
//     return `${timestamp} [${label}] ${level}: ${message}`;
//   });
const myFormat = json(({level,message,label,httpRequest})=>{
    return {
        level,message,label,httpRequest
    }
})
const logger = winston.createLogger({
    format: combine(
        timestamp(),
        myFormat
      ),
    // format:myFormat,
    // format: json({timestamp,label,level,message}),
    transports: process.env.ENVIRONMENT === "PRODUCTION" ?
        [
            new winston.transports.File({ filename: '/var/log/webapp/error.log', level: 'error' }),
            new winston.transports.File({ filename: '/var/log/webapp/combined.log' })
        ] :
        [
            new winston.transports.Console()
        ]
})
module.exports= {logger};
