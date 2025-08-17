import type { UserRepository } from './user.repository.js';
import type { CreateUserInput, UserResponse } from './user.entity.js';

export class UserService {
    constructor(private repository: UserRepository) {}

    async createUser(data: CreateUserInput): Promise<UserResponse> {
        return await this.repository.createUser(data);
    }

    async getUserById(id: number): Promise<UserResponse | null> {
        const user = await this.repository.getUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getAllUsers(): Promise<UserResponse[]> {
        return await this.repository.getAllUsers();
    }
}
