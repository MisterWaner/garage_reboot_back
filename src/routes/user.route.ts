import type { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller.js";
import { UserService } from "../services/user.service.js";
import { UserRepository } from "../repositories/user.repository.js";

export function userRoutes(app: FastifyInstance) {
    const repo = new UserRepository();
    const service = new UserService(repo);
    const controller = new UserController(service);

    app.get("/users", controller.getUsers.bind(controller));
    app.post("/users", controller.createUser.bind(controller));
}