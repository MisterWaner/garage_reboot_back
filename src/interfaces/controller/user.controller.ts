import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CreateUserInput } from '../../domain/user/user.entity.js';
import { UserService } from '../../domain/user/user.service.js';

export class UserController {
    constructor(private userService: UserService) {}

    async createUser(
        req: FastifyRequest<{
            Body: {
                firstname: CreateUserInput['firstname'];
                lastname: CreateUserInput['lastname'];
                role: CreateUserInput['role'];
            };
        }>,
        reply: FastifyReply
    ) {
        try {
            const user = await this.userService.createUser(req.body);
            console.log('User created:', user);
            return reply.status(201).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getAllUsers(req: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await this.userService.getAllUsers();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getUserById(
        req: FastifyRequest<{ Params: { id: number } }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(req.params.id);
            const user = await this.userService.getUserById(id);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}
