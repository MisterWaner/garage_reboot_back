import { describe, beforeEach, it, expect } from 'vitest';
import { UserInMemoryRepository } from '../../src/infrastructure/memory/user.inmemory.repository';
import { CreateUserUseCase } from '../../src/application/usecases/create-user.usecase';
import { Role } from '../../src/domain/user/User';

describe('CreateUserUseCase', () => {
    let userRepo: UserInMemoryRepository;
    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {
        userRepo = new UserInMemoryRepository();
        createUserUseCase = new CreateUserUseCase(userRepo);
    });

    it('should create a user with valid data', async () => {
        const userData = {
            firstname: 'John',
            lastname: 'Smith',
            role: Role.EMPLOYEE,
        };

        await createUserUseCase.execute(userData);

        const storedUser = await userRepo.findUserById(3);

        expect(storedUser).toEqual({
            id: 3,
            firstname: 'John',
            lastname: 'Smith',
            email: 'john.smith@garage-vincent-parrot.com',
            role: Role.EMPLOYEE,
            password: 'azertyop123456',
        });
    });
});
