type LogLevel = 'info' | 'error' | 'warn' | 'debug';

interface LogMessage {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: unknown;
}

const LOG_LEVELS = {
    info: 'ℹ️',
    error: '❌',
    warn: '⚠️',
    debug: '🔍',
} as const;

const STATUS_COLORS = {
    success: '🟢',
    warning: '🟡',
    error: '🔴',
} as const;

export const logger = {
    formatMessage({ timestamp, level, message, data }: LogMessage): string {
        const emoji = LOG_LEVELS[level];
        const formattedData = data ? `\n${JSON.stringify(data, null, 2)}` : '';
        return `[${timestamp}] ${emoji} ${message}${formattedData}`;
    },

    log(level: LogLevel, message: string, data?: unknown) {
        const timestamp = new Date().toISOString();
        console.log(this.formatMessage({ timestamp, level, message, data }));
    },

    info(message: string, data?: unknown) {
        this.log('info', message, data);
    },

    error(message: string, data?: unknown) {
        this.log('error', message, data);
    },

    warn(message: string, data?: unknown) {
        this.log('warn', message, data);
    },

    debug(message: string, data?: unknown) {
        this.log('debug', message, data);
    },

    request(method: string, url: string) {
        this.info(`Request: ${method} ${url}`);
    },

    response(method: string, url: string, status: number, duration: number) {
        const statusColor = status >= 500 ? STATUS_COLORS.error : 
                          status >= 400 ? STATUS_COLORS.warning : 
                          STATUS_COLORS.success;
        
        this.info(
            `${statusColor} Response: ${method} ${url} - ${status} (${duration}ms)`
        );
    },
}; 