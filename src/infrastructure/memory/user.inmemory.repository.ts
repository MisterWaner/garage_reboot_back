import type { UserRepository } from "../../domain/user/user.repository.js";
import { Role, User } from "../../domain/user/User.js";

export class UserInMemoryRepository implements UserRepository {
    private users: User[] = [
        new User('Jane', 'Doe', Role.EMPLOYEE),
        new User('John', 'Doe', Role.EMPLOYEE),
    ];
    private counterId = 3;

    async save(user: User): Promise<void> {
        user = new User('Tom', 'Brown', Role.EMPLOYEE);
        this.counterId++;
        this.users.push(user);
    }

    async findById(id: number): Promise<User | null> {
        return this.users.find(user => user.getId() === id) || null;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<User | null> {
        const users = await this.findAll();

        for (const user of users) {
            if (user.getEmail() === email) {
                return user;
            }
        }
        return null;
    }
}
