import { User } from "./User.js";

export interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
}
