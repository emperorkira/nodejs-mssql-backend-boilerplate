import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '../../.env' });

export const config = {
    user:  String(process.env.DB_USER) || 'sa',
    password:  String(process.env.DB_PASS),
    server: String(process.env.DB_SERVER) || 'localhost',
    database:  String(process.env.DB_NAME),
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        encrypt: true,
        trustServerCertificate: true,
    },
    port: parseInt(process.env.DB_PORT, 10)
};

export const token = {
    SECRET:  process.env.ACCESS_TOKEN_SECRET,
    REFRESH: process.env.REFRESH_TOKEN_SECRET,
    ENCRYPTION: process.env.ENCRYPTION_KEY
}