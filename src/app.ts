import { config } from 'dotenv';
import fastify from 'fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';

config();

import { userRoutes } from './routes/user.route.js';

export default function buildApp() {
    const app = fastify({
        logger: true,
    });
    app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send('API démarrée et opérationnelle');
    });

    app.register(userRoutes)
    return app;
}
