import type { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user.service.js";
import type { CreateUserDto } from "../dto/user.dto.js";

export class UserController {
    constructor(private userService: UserService) {}

    async getUsers(req: FastifyRequest, reply: FastifyReply) {
        const users = this.userService.getAllUsers();
        reply.status(200).send(users);
    }

    async createUser(req: FastifyRequest<{ Body: CreateUserDto }>, reply: FastifyReply) {
        const user = this.userService.createUser(req.body);
        reply.status(201).send(user);
    }
}