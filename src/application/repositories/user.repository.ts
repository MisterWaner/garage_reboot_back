import { User } from '../../domain/user/User.js';

export abstract class UserRepository {
    abstract saveUser(user: User): Promise<void>;
    abstract findAllUsers(): Promise<User[]>;
    abstract findUserById(id: number): Promise<User | null>;
    abstract findUserByEmail(email: string): Promise<User | null>;
}
