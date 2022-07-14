import nodeConfig from 'config';

interface Config {
    port: number;
    jwtSecret: string;
    mongoUri: string;
    baseUrl: string;
}

const config: Config = {
    port: nodeConfig.get<number>('port'),
    jwtSecret: nodeConfig.get<string>('jwtSecret'),
    mongoUri: nodeConfig.get<string>('mongoUri'),
    baseUrl: nodeConfig.get<string>('baseUrl')
};

export default config;