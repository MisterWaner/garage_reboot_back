import { describe, beforeEach, it, expect } from 'vitest';
import { UserInMemoryRepository } from '../../src/infrastructure/memory/user.inmemory.repository';
import { CreateUserUseCase } from '../../src/application/user/CreateUserUseCase';
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
            id: 1,
            firstname: "Jane",
            lastname: "Doe",
            role: Role.EMPLOYEE
        }

        await createUserUseCase.execute(userData);

        const storedUser = await userRepo.findById(1);

        expect(storedUser).toEqual({
            id: 1,
            firstname: "Jane",
            lastname: "Doe",
            email: "jane.doe@garage-vincent-parrot.com",
            role: Role.EMPLOYEE
        })

    })
})