const winston = require('winston');
require('dotenv').config();
var moment = require('moment-timezone');

 // Logger configuration
 const logConfiguration = {
     transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log' }),
     ],
     format: winston.format.combine(
         winston.format.timestamp({
             format: moment(new Date()).tz('America/New_York').format("YYYY-MM-DD HH:mm:ss")
         }),
         winston.format.printf((info) => {
             return `${info.timestamp} - [${info.level.toUpperCase()}]: ${info.message}`;
         })
     )
 };

 // Create the logger
 const logger = winston.createLogger(logConfiguration);

module.exports = logger;