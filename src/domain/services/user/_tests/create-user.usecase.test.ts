import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '../../../../infrastructure/memory/user.memory.repository.js';
import { UniqueUserIdGenerator } from '../features/UniqueUserIdGenerator.js';
import { CreateUserUseCase } from '../usecases/create-user.usecase.js';

import { UserFactory } from '../UserFactory.js';
import type { CreateUserDTO } from '../UserFactory.js';
import { Role, User } from '../../../models/User.js';

describe('Use Case: Create UserUseCase', () => {
    let userRepository: InMemoryUserRepository;
    let createUserUseCase: CreateUserUseCase;
    let userFactory: UserFactory;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        const generator = new UniqueUserIdGenerator(userRepository);
        userFactory = new UserFactory(generator);
        createUserUseCase = new CreateUserUseCase(userRepository, userFactory);
    })

    it('Should save a new user to the repository', async () => {
        const createdUser: CreateUserDTO = {
            firstname: 'Jane',
            lastname: 'Doe',
            birthdate: new Date('1990-01-01'),
            role: Role.EMPLOYEE
        }

        await createUserUseCase.execute(createdUser);

        const fetchedUser = await userRepository.findUserById('VP-JADO90')

        expect(fetchedUser).toEqual({
            id: 'VP-JADO90',
            firstname: 'Jane',
            lastname: 'Doe',
            birthdate: new Date('1990-01-01'),
            role: Role.EMPLOYEE,
            email: 'jane.doe@garage-vincent-parrot.com',
            password: 'azertyop123456',
            active: true
        })
    })

    it('Should create a user with unique ID even if there are users with the same two first letters in firstname & lastname, and same birth year',async  () => {
        const user1: CreateUserDTO = {
            firstname: 'Jane',
            lastname: 'Doe',
            birthdate: new Date('1990-01-01'),
            role: Role.EMPLOYEE,
        };

        const user2: CreateUserDTO = {
            firstname: 'Janine',
            lastname: 'Dodo',
            birthdate: new Date('1990-02-25'),
            role: Role.EMPLOYEE,
        };

        const user3: CreateUserDTO = {
            firstname: 'Jan',
            lastname: 'Dodo',
            birthdate: new Date('1990-03-15'),
            role: Role.EMPLOYEE,
        };

        await createUserUseCase.execute(user1);
        await createUserUseCase.execute(user2);
        await createUserUseCase.execute(user3);

        const fetchedUser1 = await userRepository.findUserById('VP-JADO90');
        const fetchedUser2 = await userRepository.findUserById('VP-JADO90-1');
        const fetchedUser3 = await userRepository.findUserById('VP-JADO90-2');

        expect(fetchedUser2?.getId()).toBe('VP-JADO90-1');
        expect(fetchedUser3?.getId()).toBe('VP-JADO90-2');
    })
})