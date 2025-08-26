import fastify from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";

export function buildApp() {
    const app = fastify({
        logger: true,
    })

    app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
        reply.send('API démarrée et opérationnelle')
    })

    return app
}