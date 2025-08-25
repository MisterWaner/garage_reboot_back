import { User, Role } from './User.js';
import type { UniqueUserIdService } from './ports/UniqueUserIdService.js';

export interface CreateUserDTO {
    firstname: string;
    lastname: string;
    birthdate: Date;
    role: Role;
}

export class UserFactory {
    constructor(private readonly uniqueUserIdService: UniqueUserIdService) {}

    private generateEmail(firstname: string, lastname: string): string {
        const domain = 'garage-vincent-parrot.com';
        const cleanFirst = firstname.trim().toLowerCase().replace(/\s+/g, '.');
        const cleanLast = lastname.trim().toLowerCase().replace(/\s+/g, '.');
        return `${cleanFirst}.${cleanLast}@${domain}`;
    }

    async create(data: CreateUserDTO): Promise<User> {
        const email = this.generateEmail(data.firstname, data.lastname);
        const id = await this.uniqueUserIdService.generateUniqueId(data.firstname, data.lastname, data.birthdate);
        return new User(id, data.firstname, data.lastname, data.birthdate, data.role, email);
    }
}
