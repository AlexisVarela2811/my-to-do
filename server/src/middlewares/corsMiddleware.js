import cors from 'cors';
import { config } from "../config/config.js";

const permittedOrigins = config.CORS_ORIGINS.split(',');

export const corsConfig = cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        // Check if the origin is in the list of permitted origins
        if (permittedOrigins.indexOf(origin) === -1) {
            const msg = 'El origen ' + origin + ' no está permitido';
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    },
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true, 
});