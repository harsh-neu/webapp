
const winston = require('winston');
const {combine, timestamp,label,json} = winston.format;
// const myFormat = printf(({ level, message, label, timestamp }) => {
//     return `${timestamp} [${label}] ${level}: ${message}`;
//   });
const myFormat = json(({level,message,label,timestamp})=>{
    return {
        level,message,label,timestamp
    }
})
const logger = winston.createLogger({
    format: combine(
        label({ label: 'User Data' }),
        timestamp(),
        myFormat
      ),
    // format: json({timestamp,label,level,message}),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})
module.exports= {logger};
