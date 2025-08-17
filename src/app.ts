import { config } from 'dotenv';
import fastify from 'fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';

config();

import { userRoutes } from './interfaces/routes/user.routes.js';
import { UserInMemoryRepository } from './infrastructure/memory/user.inmemory.repository.js';

declare module 'fastify' {
    interface FastifyInstance {
        userRepository: UserInMemoryRepository;
    }
}

export default function buildApp() {
    const app = fastify({
        logger: true,
    });
    app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send('API démarrée et opérationnelle');
    });
    app.decorate('userRepository', new UserInMemoryRepository());
    app.register(userRoutes)
    return app;
}
