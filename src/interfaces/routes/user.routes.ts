import type { FastifyInstance } from 'fastify';
import { UserController } from '../controller/user.controller.js';
import { UserInMemoryRepository } from '../../infrastructure/memory/user.inmemory.repository.js';
import type { CreateUserDTO } from '../../domain/user/UserFactory.js';
import { User } from '../../domain/user/User.js';
import { CreateUserUseCase } from '../../application/usecases/create-user.usecase.js';
import { GetUserUseCase } from '../../application/usecases/get-user.usecase.js';

export async function userRoutes(app: FastifyInstance) {
    const repo = new UserInMemoryRepository();
    const createUserUseCase = new CreateUserUseCase(repo);
    const getUserUseCase = new GetUserUseCase(repo);
    const controller = new UserController(createUserUseCase, getUserUseCase);

    app.post<{ Body: CreateUserDTO }>(
        '/users',
        controller.createUser.bind(controller)
    );
    //app.get('/users', controller.getAllUsers.bind(controller));
    app.get<{ Params: { id: number }; Reply: User }>(
        '/users/:id',
        controller.getUserById.bind(controller)
    );
    // app.delete<{ Params: { id: number } }>(
    //     '/users/:id',
    //     controller.deleteUser.bind(controller)
    // );
}
