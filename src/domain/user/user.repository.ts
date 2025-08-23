import type { CreateUserInput, UserResponse } from './user.entity.js';
import type { CarResponse, CreateCarInput, UpdatedCarInput } from '../car/car.entity.js';

export interface UserRepository {
    createUser(data: CreateUserInput): Promise<UserResponse>;
    getUserById(id: number): Promise<UserResponse | null>;
    getAllUsers(): Promise<UserResponse[]>;
    deleteUser(id: number): Promise<void>;
    addCar(data: CreateCarInput): Promise<CarResponse>;
    updateCar(data: UpdatedCarInput): Promise<CarResponse>;
    deleteCar(id: string): Promise<void>;
}