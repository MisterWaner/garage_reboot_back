import { describe, it, expect, beforeEach } from 'vitest';
import { UserInMemoryRepository } from '../../src/infrastructure/memory/user.inmemory.repository';
import { Role } from '../../src/domain/user/User';
import { UserFactory } from '../../src/domain/user/UserFactory';


describe('User Entity & Factory', () => {
    it('should create a user with auto-generated email and password', async () => {
        const createdUser = UserFactory.create({
            firstname: 'Tom',
            lastname: 'Bones',
            role: Role.EMPLOYEE,
        })

        expect(createdUser.getFirstname()).toBe("Tom");
        expect(createdUser.getLastname()).toBe("Bones");
        expect(createdUser.getEmail()).toBe("tom.bones@garage-vincent-parrot.com");
        expect(createdUser.getRole()).toBe(Role.EMPLOYEE);
        expect(createdUser.getPassword()).toBeDefined();
        expect(createdUser.getPassword()?.length).toBe(14);
    });
});

describe('User Repository', () => {
    let repo: UserInMemoryRepository;

    beforeEach(() => {
        repo = new UserInMemoryRepository();
    });

    it('should save and retrieve a user', async () => {
        const createdUser = UserFactory.create({
            firstname: 'Caroline',
            lastname: 'Doe',
            role: Role.ADMIN,
        });

        await repo.saveUser(createdUser);

        const retrievedUser = await repo.findUserById(4);
        expect(retrievedUser).toEqual(createdUser);
        expect(retrievedUser?.getId()).toBe(4);
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

        await repo.saveUser(user1);
        await repo.saveUser(user2);

        const allUsers = await repo.findAllUsers();
        expect(allUsers).toEqual([user1, user2]);
    });
});
