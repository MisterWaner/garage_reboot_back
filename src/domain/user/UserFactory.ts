import { User, Role } from './User.js';

export interface CreateUserDTO {
    firstname: string;
    lastname: string;
    role: Role;
}

export class UserFactory {
    static create(data: CreateUserDTO): User {
        const user = new User(
            data.firstname,
            data.lastname,
            data.role
        );

        return user;
    }
}
