import { describe, beforeEach, expect, it } from 'vitest';
import { UserInMemoryRepository } from '../../../infrastructure/memory/user.inmemory.repository.js';
import { UniqueUserIdGenerator } from '../UniqueUserIdGenerator.js';
import { User, Role } from '../User.js';
import { UserFactory } from '../UserFactory.js';
import type { CreateUserDTO } from '../UserFactory.js';
import { CreateUserUseCase } from '../../../application/usecases/user/create-user.usecase.js';

describe('Feature: Create a user', () => {
    let userRepository: UserInMemoryRepository;
    let generator: UniqueUserIdGenerator;
    let factory: UserFactory;

    beforeEach(() => {
        userRepository = new UserInMemoryRepository();
        generator = new UniqueUserIdGenerator(userRepository);
        factory = new UserFactory(generator);
    });

    it('Should create a user with a unique ID, generated Email', async () => {
        const createdUser = await factory.create({
            firstname: 'John',
            lastname: 'Doe',
            birthdate: new Date('1990-01-01'),
            role: Role.EMPLOYEE,
        });

        expect(createdUser).toBeInstanceOf(User);
        expect(createdUser.getId()).toBeDefined();
        expect(createdUser.getEmail()).toBeDefined();
        expect(createdUser.getBirthdate()).toEqual(createdUser.getBirthdate());
    });
});

describe('Use Case: CreateUserUseCase', () => {
    let userRepository: UserInMemoryRepository;
    let createUserUseCase: CreateUserUseCase;
    let userFactory: UserFactory;

    beforeEach(() => {
        userRepository = new UserInMemoryRepository();
        const generator = new UniqueUserIdGenerator(userRepository);
        userFactory = new UserFactory(generator);
        createUserUseCase = new CreateUserUseCase(userRepository, userFactory);
    });

    it('Should save a new user to the repository', async () => {
        const createdUser: CreateUserDTO = {
            firstname: 'Jane',
            lastname: 'Smith',
            birthdate: new Date('1985-05-15'),
            role: Role.EMPLOYEE,
        };

        await createUserUseCase.execute(createdUser);

        const fetchedUser = await userRepository.findUserById('VP-JASM85');

        expect(fetchedUser).toEqual({
            id: 'VP-JASM85',
            email: 'jane.smith@garage-vincent-parrot.com',
            firstname: 'Jane',
            lastname: 'Smith',
            birthdate: new Date('1985-05-15'),
            role: Role.EMPLOYEE,
            password: 'azertyop123456',
        });
        expect(fetchedUser).not.toBeNull();
        expect(fetchedUser?.getEmail()).toEqual(
            'jane.smith@garage-vincent-parrot.com'
        );
        expect(fetchedUser?.getId()).toEqual('VP-JASM85');
        expect(fetchedUser?.getFirstname()).toBe('Jane');
        expect(fetchedUser?.getLastname()).toBe('Smith');
        expect(fetchedUser?.getBirthdate()).toEqual(new Date('1985-05-15'));
        expect(fetchedUser?.getRole()).toBe(Role.EMPLOYEE);
    });

    it('Should create a second user with a unique ID', async () => {
        await createUserUseCase.execute({
            firstname: 'Alice',
            lastname: 'Johnson',
            birthdate: new Date('1992-02-02'),
            role: Role.EMPLOYEE,
        });

        const user2 = await createUserUseCase.execute({
            firstname: 'Alisson',
            lastname: 'Jordan',
            birthdate: new Date('1992-08-08'),
            role: Role.EMPLOYEE,
        });

        const user3 = await createUserUseCase.execute({
            firstname: 'Ally',
            lastname: 'Jojo',
            birthdate: new Date('1992-03-03'),
            role: Role.EMPLOYEE,
        });

        const found = await userRepository.findUserById(user2.getId());
        const found2 = await userRepository.findUserById(user3.getId());

        expect(found).toEqual(user2);
        expect(found?.getId()).toBe('VP-ALJO92-1');
        expect(found2).toEqual(user3);
        expect(found2?.getId()).toBe('VP-ALJO92-2');
    });
});
