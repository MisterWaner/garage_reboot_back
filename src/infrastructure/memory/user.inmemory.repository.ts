import type { UserRepository } from "../../domain/user/user.repository.js";
import type { CreateUserInput, UserResponse } from "../../domain/user/user.entity.js";
import type { CarResponse, CreateCarInput, UpdatedCarInput } from "../../domain/car/car.entity.js";
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

    async addCar(data: CreateCarInput): Promise<CarResponse> {
        const userId = (await this.getUserById(1))?.id;

        if (!userId) {
            throw new Error('User not found');
        }

        const newCar: CarResponse = {
            ...data,
            id: 'CAR-123',
            addedBy: userId,
            createdAt: new Date().getDate().toString(),
        };
        return Promise.resolve(newCar);
    }

    async updateCar(data: UpdatedCarInput): Promise<CarResponse> {
        const userId = (await this.getUserById(1))?.id;
        const updaterId = (await this.getUserById(2))?.id;

        if (!userId) {
            throw new Error('User not found');
        }

        const updatedCar: CarResponse = {
            ...data,
            id: 'CAR-123',
            updatedBy: updaterId,
            addedBy: userId,
            createdAt: new Date().getDate().toString(),
        };
        return Promise.resolve(updatedCar);
    }

    async deleteCar(id: string): Promise<void> {
        // Simulate deleting a car
        return Promise.resolve();
    }
}