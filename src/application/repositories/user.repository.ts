import { User } from "../../domain/models/User.js";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findAllUsers(): Promise<User[]>;
    abstract findUserById(id: string): Promise<User | null>;
    abstract findUserByEmail(email: string): Promise<User | null>;
    abstract updateUser(id: string, user: Partial<User>): Promise<void>;
    abstract deactivateUser(id: string): Promise<void>;
}