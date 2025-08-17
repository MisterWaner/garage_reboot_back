import type { FastifyInstance } from 'fastify';
import { UserController } from '../controller/user.controller.js';
import { UserService } from '../../domain/user/user.service.js';
import { UserInMemoryRepository } from '../../infrastructure/memory/user.inmemory.repository.js';
import type {
    CreateUserInput,
    UserResponse,
} from '../../domain/user/user.entity.js';

export async function userRoutes(app: FastifyInstance) {

    const repo = new UserInMemoryRepository();
    const service = new UserService(repo);
    const controller = new UserController(service);

    app.post<{ Body: CreateUserInput }>('/users', controller.createUser.bind(controller));
    app.get('/users', controller.getAllUsers.bind(controller));
    app.get<{ Params: { id: number }; Reply: UserResponse }>(
        '/users/:id',
        controller.getUserById.bind(controller)
    );
    app.delete<{ Params: { id: number } }>('/users/:id', controller.deleteUser.bind(controller));
}
