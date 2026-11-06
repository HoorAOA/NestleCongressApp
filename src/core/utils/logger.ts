const isDevelopment = __DEV__ === true;

const logger = {
    log: (...args: unknown[]) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },
    error: (...args: unknown[]) => {
        if (isDevelopment) {
            console.error(...args);
        }
    },
};

export default logger;
