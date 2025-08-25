import { describe, beforeEach, expect, it } from 'vitest';
import { UserInMemoryRepository } from '../../../infrastructure/memory/user.inmemory.repository.js';
import { DeleteUserUseCase } from '../../../application/usecases/user/delete-user.usecase.js';
import { User, Role } from '../User.js';
import { UserFactory } from '../UserFactory.js';
import type { CreateUserDTO } from '../UserFactory.js';
import { CreateUserUseCase } from '../../../application/usecases/user/create-user.usecase.js';
import { UniqueUserIdGenerator } from '../UniqueUserIdGenerator.js';

describe('Feature: Delete a user', () => {
    let userRepository: UserInMemoryRepository;
    let deleteUserUseCase: DeleteUserUseCase;

    beforeEach(() => {
        userRepository = new UserInMemoryRepository();
        deleteUserUseCase = new DeleteUserUseCase(userRepository);
    });

    it('Should delete a user by ID', async () => {
        const userFactory = new UserFactory(
            new UniqueUserIdGenerator(userRepository)
        );
        const createUserUseCase = new CreateUserUseCase(
            userRepository,
            userFactory
        );

        const user = await createUserUseCase.execute({
            firstname: 'John',
            lastname: 'Doe',
            birthdate: new Date('1990-01-01'),
            role: Role.EMPLOYEE,
        });

        const user2 = await createUserUseCase.execute({
            firstname: 'Jane',
            lastname: 'Doe',
            birthdate: new Date('1992-02-02'),
            role: Role.EMPLOYEE,
        });

        await deleteUserUseCase.execute(user.getId());

        const deletedUser = await userRepository.findUserById(user.getId());
        expect(deletedUser).toBeNull();
    });
});
