"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
require("winston-daily-rotate-file");
class AppLogger {
    static newInstance() {
        const levels = {
            error: 0,
            warn: 1,
            info: 2,
            data: 3,
            verbose: 4,
            debug: 5,
        };
        const rotateFileTransport = new winston_1.transports.DailyRotateFile({
            levels,
            level: process.env.LOG_LEVEL || 'info',
            datePattern: 'dd-MM-yyyy.',
            dirname: './logs',
            filename: './log',
            prepend: true,
        });
        const consoleTransport = new winston_1.transports.Console({
            levels,
            level: process.env.LOG_LEVEL || 'info',
            colorize: true,
            prettyPrint: true,
            timestamp: true
        });
        return new winston_1.Logger({
            levels,
            transports: [rotateFileTransport, consoleTransport],
        });
    }
}
exports.AppLogger = AppLogger;
exports.default = AppLogger.newInstance();
