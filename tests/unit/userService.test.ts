import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from '../../src/domain/user/user.service';
import { UserInMemoryRepository } from '../../src/infrastructure/memory/user.inmemory.repository';
import { Role } from '../../src/domain/user/user.entity';

let service: UserService;

beforeEach(() => {
    service = new UserService(new UserInMemoryRepository());
});

describe('UserService.createUser', () => {
    it('should fail if required fields are missing', async () => {
        await expect(
            service.createUser({
                firstname: '',
                lastname: '',
                role: Role.EMPLOYEE,
            })
        ).rejects.toThrow('Missing required fields');
    });

    it('should create a user if all required fields are provided', async () => {
        const user = await service.createUser({
            firstname: 'John',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        });

        expect(user).toEqual({
            id: expect.any(Number),
            firstname: 'John',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        });
    });
});

describe('UserService.getUserById', () => {
    it('should return a user by id', async () => {
        const createdUser = await service.createUser({
            firstname: 'Jane',
            lastname: 'Doe',
            role: Role.ADMIN,
        });

        const user = await service.getUserById(createdUser.id);

        expect(user).toEqual({
            id: createdUser.id,
            firstname: 'Jane',
            lastname: 'Doe',
            role: Role.ADMIN,
        });
    });
});

describe('UserService.getAllUsers', () => {
    it('should return all users', async () => {

        const users = await service.getAllUsers();

        expect(users).toEqual([
            {
                id: 1,
                firstname: 'Alice',
                lastname: 'Doe',
                email: 'alice@example.com',
                role: Role.EMPLOYEE,
            },
            {
                id: 2,
                firstname: 'Bob',
                email: 'bob@example.com',
                lastname: 'Smith',
                role: Role.ADMIN,
            },
        ]);
    });
});

describe('UserService.deleteUser', () => {
    it('should delete a user by id', async () => {
        const createdUser = await service.createUser({
            firstname: 'John',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        });

        await service.deleteUser(createdUser.id);

        await expect(service.getUserById(createdUser.id)).rejects.toThrow('User not found');
    });
});