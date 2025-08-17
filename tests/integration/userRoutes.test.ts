import { describe, it, expect, beforeEach } from 'vitest';
import buildApp from '../../src/app';
import { Role } from '../../src/domain/user/user.entity';

describe('User API', () => {
    let app = buildApp();

    beforeEach(async () => {
        app = buildApp();
        await app.ready();

        app.userRepository.createUser({
            firstname: 'Alice',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        });
        app.userRepository.createUser({
            firstname: 'Bob',
            lastname: 'Smith',
            role: Role.ADMIN,
        });
    });

    it('GET /users => should return all users', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/users',
        });

        expect(res.statusCode).toBe(200);
        expect(res.json()).toEqual([
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
                lastname: 'Smith',
                email: 'bob@example.com',
                role: Role.ADMIN,
            },
        ]);
    });

    it('GET /users/:id => should return a user by id', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/users/2',
        });

        expect(res.statusCode).toBe(200);
        expect(res.json()).toEqual({
            id: 2,
            firstname: 'Bob',
            lastname: 'Smith',
            email: 'bob@example.com',
            role: Role.ADMIN,
        });
    });

    it('POST /users => should create a new user', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/users',
            payload: {
                firstname: 'John',
                lastname: 'Doe',
                role: Role.EMPLOYEE,
            },
        });

        console.log('STATUS:', res.statusCode);
        console.log('RAW BODY:', res.body);

        const data = res.json ? res.json() : JSON.parse(res.body as string);
        console.log('PARSED BODY:', data);

        expect(res.statusCode).toBe(201);
        expect(data).toEqual({
            id: 3,
            firstname: 'John',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        });
    });

    it('DELETE /users/:id => should delete a specific user', async () => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/users/2',
        });

        expect(res.statusCode).toBe(204);
    });
});
