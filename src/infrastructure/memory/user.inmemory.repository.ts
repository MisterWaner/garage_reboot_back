import type { UserRepository } from "../../domain/user/user.repository.js";
import type { CreateUserInput, UserResponse } from "../../domain/user/user.entity.js";
import { Role } from "../../domain/user/user.entity.js";

export class UserInMemoryRepository implements UserRepository {
    private users: UserResponse[] = [
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
    ];
    private counterId = 3; // Simulating an auto-increment ID

    async createUser(data: CreateUserInput): Promise<UserResponse> {
        const newUser = {
            id: this.counterId++,
            ...data,
        };
        this.users.push(newUser);
        return newUser
    }
    async getUserById(id: number): Promise<UserResponse | null> {
        const user = this.users.find(user => user.id === id);
        return Promise.resolve(user || null);
    }
    async getAllUsers(): Promise<UserResponse[]> {
        return Promise.resolve(this.users);
    }

    async deleteUser(id: number): Promise<void> {
        this.users = this.users.filter(user => user.id !== id);
        return Promise.resolve();
    }
}