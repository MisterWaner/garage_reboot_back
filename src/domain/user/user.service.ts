import type { UserRepository } from './user.repository.js';
import type { CreateUserInput, UserResponse } from './user.entity.js';
import type { CarResponse, CreateCarInput } from '../car/car.entity.js';

export class UserService {
    constructor(private repository: UserRepository) {}

    async createUser({firstname, lastname, role}: CreateUserInput): Promise<UserResponse> {
        if (!firstname || !lastname || !role) {
            throw new Error('Missing required fields');
        }
        return await this.repository.createUser({firstname, lastname, role});
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

    async deleteUser(id: number): Promise<void> {
        await this.repository.deleteUser(id);
    }

    async addCar(data: CreateCarInput): Promise<CarResponse> {
        return await this.repository.addCar(data);
    }
}
