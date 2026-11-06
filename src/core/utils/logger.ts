import { environment } from '../config';

const logger = {
    log: (...args: unknown[]) => {
        if (environment.enableLogs) {
            console.log(...args);
        }
    },
    error: (...args: unknown[]) => {
        if (environment.enableLogs) {
            console.error(...args);
        }
    },
};

export default logger;
