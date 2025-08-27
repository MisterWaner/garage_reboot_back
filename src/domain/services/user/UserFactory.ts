import { User, Role } from "../../models/User.js";
import type { UniqueUserIdService } from "./UniqueUserIdService.js";
import type { TemporaryPasswordService } from "./TemporaryPasswordService.js";

export interface CreateUserDTO {
    firstname: string;
    lastname: string;
    birthdate: Date;
    role: Role;
}

export class UserFactory {
    constructor(private readonly uniqueUserIdService: UniqueUserIdService, private readonly temporaryPasswordService: TemporaryPasswordService) {}

    private generateEmail(firstname: string, lastname: string): string {
        const domain = 'garage-vincent-parrot.com';
        const normalizedFirstname = firstname.trim().toLowerCase().replace(/\s+/g, '.');
        const normalizedLastname = lastname.trim().toLowerCase().replace(/\s+/g, '.');
        return `${normalizedFirstname}.${normalizedLastname}@${domain}`;
    }

    async createUser(data: CreateUserDTO): Promise<User> {
        const email = this.generateEmail(data.firstname, data.lastname);
        const id = await this.uniqueUserIdService.generateUniqueId(data.firstname, data.lastname, data.birthdate);
        const temporaryPassword = this.temporaryPasswordService.generateTemporaryPassword(20);
        const newUser = new User(id, data.firstname, data.lastname, data.birthdate, data.role, email, temporaryPassword);
        return newUser;
    }
}