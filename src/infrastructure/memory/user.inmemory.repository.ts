import { UserRepository } from '../../application/repositories/user.repository.js';
import { Role, User } from '../../domain/user/User.js';

export class UserInMemoryRepository implements UserRepository {
    users: User[] = [
        new User('Jane', 'Doe', Role.EMPLOYEE),
        new User('John', 'Doe', Role.EMPLOYEE),
    ];

    saveUser(user: User): Promise<void> {
        this.addUser(user);
        return Promise.resolve();
    }

    findAllUsers(): Promise<User[]> {
        return Promise.resolve(Array.from(this.users.values()));
    }
    findUserById(id: number): Promise<User | null> {
        const user = this.users.find((user) => user.getId() === id);
        return Promise.resolve(user || null);
    }
    findUserByEmail(email: string): Promise<User | null> {
        for (const user of this.users.values()) {
            if (user.getEmail() === email) {
                return Promise.resolve(user);
            }
        }
        return Promise.resolve(null);
    }

    private addUser(user: User) {
        this.users.push(user);
    }
}
