export type EnvironmentName = 'development' | 'production';

export interface AppEnvironment {
    name: EnvironmentName;
    isDevelopment: boolean;
    isProduction: boolean;
    enableLogs: boolean;
    // apiBaseUrl: string;
}

const isDevelopment = __DEV__ === true;

export const environment: AppEnvironment = {
    name: isDevelopment ? 'development' : 'production',
    isDevelopment,
    isProduction: !isDevelopment,
    enableLogs: isDevelopment,
    // apiBaseUrl: isDevelopment
    //     ? 'https://dev-api.nestle-congress.example'
    //     : 'https://api.nestle-congress.example',
};

export const isDevelopmentEnvironment = environment.isDevelopment;
export const isProductionEnvironment = environment.isProduction;
