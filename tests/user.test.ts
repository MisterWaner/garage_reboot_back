import {describe, it, expect, beforeEach} from "vitest";
import buildApp from '../src/app.js';

describe('User API', () => {
    let app = buildApp();

    beforeEach(() => {
        app = buildApp();
    })

    it("GET /users => should return all users", async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/users'
        })

        expect(res.statusCode).toBe(200);
        expect(res.json()).toEqual([]);
    })

    it("POST /users => shold create a new user", async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/users',
            payload: {
                name: "Alice"
            }
        })

        expect(res.statusCode).toBe(201);
        expect(res.json()).toEqual({ id: 1, name: "Alice" });
    })
})