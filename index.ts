import { Logger, transports as Transports } from 'winston';
import 'winston-daily-rotate-file';

export class AppLogger {
    static newInstance() {
        const levels = {
            error: 0,
            warn: 1,
            info: 2,
            data: 3,
            verbose: 4,
            debug: 5,
        };

        const rotateFileTransport = new Transports.DailyRotateFile({
            levels,
            level: process.env.LOG_LEVEL || 'info',
            datePattern: 'dd-MM-yyyy.',
            dirname: './logs',
            filename: './log',
            prepend: true,
        });

        const consoleTransport = new Transports.Console({
            levels,
            level: process.env.LOG_LEVEL || 'info',
            colorize: true,
            prettyPrint: true,
            timestamp: true
        });

        return new Logger({
            levels,
            transports: [rotateFileTransport, consoleTransport],
        });
    }
}

export default AppLogger.newInstance();
