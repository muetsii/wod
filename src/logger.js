const { createLogger, format, transports } = require('winston');
const config = require('./configure');

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
    // To see more detailed errors, change this to 'debug'
    level: config.get('log.level') || 'info',
    format: format.combine(
        format.splat(),
        format.simple(),
    ),
    transports: [
        new transports.Console()
    ],
    exitOnError: false,
});

module.exports = logger;
