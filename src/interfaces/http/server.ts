import fastify from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";

import { userRoutes } from "../routes/user.routes.js";
import { UserInMemoryRepository } from "../../infrastructure/memory/user.inmemory.repository.js";

declare module "fastify" {
    interface FastifyInstance {
        userRepository: UserInMemoryRepository;
    }
}

export function buildServer() {
    const app = fastify({
        logger: true,
    });

    app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
        reply.send('API démarée et opérationnelle')
    })
    app.decorate("userRepository", new UserInMemoryRepository());
    app.register(userRoutes)

    return app
}