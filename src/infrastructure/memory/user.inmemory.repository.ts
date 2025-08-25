import { UserRepository } from '../../application/repositories/user.repository.js';
import { Role, User } from '../../domain/user/User.js';

export class UserInMemoryRepository implements UserRepository {
    users = new Map<string, User>();

    saveUser(user: User): Promise<void> {
        this.addUser(user);
        return Promise.resolve();
    }

    findAllUsers(): Promise<User[]> {
        return Promise.resolve(Array.from(this.users.values()));
    }

    findUserById(id: string): Promise<User | null> {
        const user = Array.from(this.users.values()).find(
            (user) => user.getId() === id
        );
        return Promise.resolve(user || null);
    }

    findUserByEmail(email: string): Promise<User | null> {
        const user = Array.from(this.users.values()).find(
            (user) => user.getEmail() === email
        );
        return Promise.resolve(user || null);
    }

    deleteUser(id: string): Promise<void> {
        this.users.delete(id);
        return Promise.resolve();
    }

    private addUser(user: User) {
        this.users.set(user.getId(), user);
    }
}
