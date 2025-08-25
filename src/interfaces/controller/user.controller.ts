import type { FastifyRequest, FastifyReply } from 'fastify';
import type { CreateUserDTO } from '../../domain/user/UserFactory.js';
import { CreateUserUseCase } from '../../application/usecases/create-user.usecase.js';
import { GetUserUseCase } from '../../application/usecases/get-user.usecase.js';
import { DeleteUserUseCase } from '../../application/usecases/delete-user.usecase.js';

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getUserUseCase: GetUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    async createUser(
        req: FastifyRequest<{
            Body: {
                firstname: CreateUserDTO['firstname'];
                lastname: CreateUserDTO['lastname'];
                birthdate: CreateUserDTO['birthdate'];
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

    async getAllUsers(req: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await this.getUserUseCase.all();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getUserById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const id = req.params.id;
            const user = await this.getUserUseCase.byId(id);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async deleteUser(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const id = req.params.id;
            await this.deleteUserUseCase.execute(id);
            reply.status(204).send();
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}
