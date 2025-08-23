import { describe, it, expect, beforeEach } from 'vitest';
import buildApp from '../../src/app';
import { Role, User } from '../../src/domain/user/User';

describe('User Routes', () => {
    let app: ReturnType<typeof buildApp>;

    beforeEach(async () => {
        app = buildApp();
        await app.ready();

    });

    it('POST /users - should create a new user', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/users',
            payload: {
                firstname: 'Jane',
                lastname: 'Doe',
                role: Role.EMPLOYEE,
            },
        });

        expect(response.statusCode).toBe(201);
    });

    it('GET /users/:id - should retrieve user with id', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/users/1',
        });

        expect(response.statusCode).toBe(200);
        const body = response.json();
        expect(body).toEqual({
            id: 1,
            firstname: 'Jane',
            lastname: 'Doe',
            email: 'jane.doe@garage-vincent-parrot.com',
        });
    });

});
