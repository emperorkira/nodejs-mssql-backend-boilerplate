import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '../../.env' });

export const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        encrypt: true,
        trustServerCertificate: true,
    },
    port: parseInt(process.env.DB_PORT, 10),
};
