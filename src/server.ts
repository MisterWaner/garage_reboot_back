import { config } from 'dotenv';
import { buildApp } from './app.js';

config();

const PORT = Number(process.env.SERVER_PORT) || 3000;

const server = buildApp();

server.listen({ port: PORT }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }

    server.log.info(`🚀 Server ready at ${address}`);
});
