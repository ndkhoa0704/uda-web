const winston = require('winston');
const {transports, format} = winston;
const path = require('path');

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.printf(({timestamp, level, message}) => {
                    return `${timestamp} ${level}: ${message}`;
                })
            )
        }),
        new transports.File({
            filename: path.join(__dirname, '../logs', 'app.log'),
            maxsize: 100 * 1024 * 1024, // 100 MB
            maxFiles: 7,
            tailable: true
        })
    ]
});

module.exports = logger;