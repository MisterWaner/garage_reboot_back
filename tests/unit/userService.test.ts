import { describe, it, expect, beforeEach } from 'vitest';
import { UserInMemoryRepository } from '../../src/infrastructure/memory/user.inmemory.repository';
import { Role } from '../../src/domain/user/User';
import { UserFactory } from '../../src/domain/user/UserFactory';


describe('User Entity & Factory', () => {
    it('should create a user with auto-generated email and password', async () => {
        const createdUser = UserFactory.create({
            firstname: 'John',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        })

        expect(createdUser.getFirstname()).toBe("John");
        expect(createdUser.getLastname()).toBe("Doe");
        expect(createdUser.getEmail()).toBe("john.doe@garage-vincent-parrot.com");
        expect(createdUser.getRole()).toBe(Role.EMPLOYEE);
        expect(createdUser.getPassword()).toBeDefined();
        expect(createdUser.getPassword()?.length).toBe(20);
    });
});

describe('User Repository', () => {
    let repo: UserInMemoryRepository;

    beforeEach(() => {
        repo = new UserInMemoryRepository();
    });

    it('should save and retrieve a user', async () => {
        const createdUser = UserFactory.create({
            firstname: 'Jane',
            lastname: 'Doe',
            role: Role.ADMIN,
        });

        await repo.save(createdUser);

        const retrievedUser = await repo.findById(2);
        expect(retrievedUser).toEqual(createdUser);
        expect(retrievedUser?.getId()).toBe(2);
    });

    it("should retrieve all users", async () => {
        const user1 = UserFactory.create({
            firstname: 'Alice',
            lastname: 'Smith',
            role: Role.EMPLOYEE,
        });
        const user2 = UserFactory.create({
            firstname: 'Bob',
            lastname: 'Johnson',
            role: Role.ADMIN,
        });

        await repo.save(user1);
        await repo.save(user2);

        const allUsers = await repo.findAll();
        expect(allUsers).toEqual([user1, user2]);
    });
});
