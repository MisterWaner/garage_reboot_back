import { UserRepository } from "../../application/repositories/user.repository.js";
import { User } from "../../domain/models/User.js";

export class InMemoryUserRepository implements UserRepository {
    users = new Map<string, User>();

    create(user: User): Promise<void> {
        this.addUser(user);
        return Promise.resolve();
    }
    
    findAllUsers(): Promise<User[]> {
        return Promise.resolve(Array.from(this.users.values()));
    }
    findUserById(id: string): Promise<User | null> {
        return Promise.resolve(this.users.get(id) || null);
    }
    findUserByEmail(email: string): Promise<User | null> {
        const user = Array.from(this.users.values()).find(user => user.getEmail() === email);
        return Promise.resolve(user || null);
    }
    updateUser(id: string, user: Partial<User>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deactivateUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private addUser(user: User) {
        this.users.set(user.getId(), user);
    }
}