import type { CreateUserInput, UserResponse } from './user.entity.js';

export interface UserRepository {
    createUser(data: CreateUserInput): Promise<UserResponse>;
    getUserById(id: number): Promise<UserResponse | null>;
    getAllUsers(): Promise<UserResponse[]>;
    deleteUser(id: number): Promise<void>;
}