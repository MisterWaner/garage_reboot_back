import type { CreateUserDto } from '../dto/user.dto.js';

export interface User {
    id: number;
    name: string;
}

export class UserRepository {
    private users: User[] = [];
    private idCounter = 1;

    getAll(): User[] {
        return this.users;
    }

    create(dto: CreateUserDto): User {
        const user = { id: this.idCounter++, ...dto };
        this.users.push(user);
        return user;
    }

    clear(): void {
        this.users = [];
        this.idCounter = 1;
    }
}
