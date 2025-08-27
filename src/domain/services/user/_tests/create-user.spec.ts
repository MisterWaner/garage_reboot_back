import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '../../../../infrastructure/memory/user.memory.repository.js';
import { UniqueUserIdGenerator } from '../features/UniqueUserIdGenerator.js';

import { UserFactory } from '../UserFactory.js';
import { Role, User } from '../../../models/User.js';

describe('Feature : Create a user', () => {
    let userRepository: InMemoryUserRepository;
    let generator: UniqueUserIdGenerator;
    let factory: UserFactory;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        generator = new UniqueUserIdGenerator(userRepository);
        factory = new UserFactory(generator);
    })

    it('Should create a user with valid data', async () => {
        const createdUser = await factory.createUser({
            firstname: 'Jane',
            lastname: 'Doe',
            birthdate: new Date('1990-01-01'),
            role: Role.EMPLOYEE
        })

        expect(createdUser).toBeInstanceOf(User);
        expect(createdUser.getEmail()).toBe('jane.doe@garage-vincent-parrot.com');
        expect(createdUser.getId()).toBe('VP-JADO90');
    })

    
})
