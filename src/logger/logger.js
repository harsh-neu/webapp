
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
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: '/var/log/webapp/error.log', level: 'error' }),
        new winston.transports.File({ filename: '/var/log/webapp/combined.log' }),
        //  new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
    ],
})
module.exports= {logger};
