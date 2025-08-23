import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CreateUserDTO } from '../../domain/user/UserFactory.js';
import { CreateUserUseCase } from '../../application/user/CreateUserUseCase.js';
import { GetUserByIdUseCase } from '../../application/user/GetUserByIdUseCase.js';

export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase, private getUserByIdUseCase: GetUserByIdUseCase) {}

    async createUser(
        req: FastifyRequest<{
            Body: {
                firstname: CreateUserDTO['firstname'];
                lastname: CreateUserDTO['lastname'];
                role: CreateUserDTO['role'];
            };
        }>,
        reply: FastifyReply
    ) {
        try {
            const user = await this.createUserUseCase.execute(req.body);
            console.log('User created:', user);
            return reply.status(201).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    // async getAllUsers(req: FastifyRequest, reply: FastifyReply) {
    //     try {
    //         const users = await this.userService.getAllUsers();
    //         reply.status(200).send(users);
    //     } catch (error) {
    //         reply.status(500).send(error);
    //     }
    // }

    async getUserById(
        req: FastifyRequest<{ Params: { id: number } }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(req.params.id);
            const user = await this.getUserByIdUseCase.execute(id);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    // async deleteUser(
    //     req: FastifyRequest<{ Params: { id: number } }>,
    //     reply: FastifyReply
    // ) {
    //     try {
    //         const id = Number(req.params.id);
    //         await this.userService.deleteUser(id);
    //         reply.status(204).send();
    //     } catch (error) {
    //         reply.status(500).send(error);
    //     }
    // }
}
