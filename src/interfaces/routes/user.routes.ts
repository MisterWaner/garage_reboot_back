import type { FastifyInstance } from 'fastify';
import { UserController } from '../controller/user.controller.js';
import { UserInMemoryRepository } from '../../infrastructure/memory/user.inmemory.repository.js';
import { UserFactory } from '../../domain/user/UserFactory.js';
import type { CreateUserDTO } from '../../domain/user/UserFactory.js';
import { User } from '../../domain/user/User.js';
import { CreateUserUseCase } from '../../application/usecases/user/create-user.usecase.js';
import { GetUserUseCase } from '../../application/usecases/user/get-user.usecase.js';
import { UniqueUserIdGenerator } from '../../domain/user/UniqueUserIdGenerator.js';
import { DeleteUserUseCase } from '../../application/usecases/user/delete-user.usecase.js';

export async function userRoutes(app: FastifyInstance) {
    const repo = new UserInMemoryRepository();
    const factory = new UserFactory(new UniqueUserIdGenerator(repo));
    const createUserUseCase = new CreateUserUseCase(repo, factory);
    const getUserUseCase = new GetUserUseCase(repo);
    const deleteUserUseCase = new DeleteUserUseCase(repo);

    const controller = new UserController(
        createUserUseCase,
        getUserUseCase,
        deleteUserUseCase
    );

    app.post<{ Body: CreateUserDTO }>(
        '/users',
        controller.createUser.bind(controller)
    );
    app.get('/users', controller.getAllUsers.bind(controller));
    app.get<{ Params: { id: string }; Reply: User }>(
        '/users/:id',
        controller.getUserById.bind(controller)
    );
    app.delete<{ Params: { id: string } }>(
        '/users/:id',
        controller.deleteUser.bind(controller)
    );
}
