import { UserRepository } from '../../../../application/repositories/user.repository.js';
import type { UniqueUserIdService } from '../UniqueUserIdService.js';

export class UniqueUserIdGenerator implements UniqueUserIdService {
    constructor(private readonly userRepository: UserRepository) {}

    private baseId(
        firstname: string,
        lastname: string,
        birthdate: Date
    ): string {
        const firstPart = 'VP';
        const secondPart = firstname.slice(0, 2).toUpperCase();
        const thirdPart = lastname.slice(0, 2).toUpperCase();
        const fourthPart = birthdate.getFullYear().toString().slice(-2);

        return `${firstPart}-${secondPart}${thirdPart}${fourthPart}`;
    }

    async generateUniqueId(
        firstname: string,
        lastname: string,
        birthdate: Date
    ): Promise<string> {
        const base = this.baseId(firstname, lastname, birthdate);
        let uniqueId = base;
        let counter = 1;

        while (await this.userRepository.findUserById(uniqueId)) {
            uniqueId = `${base}-${counter}`;
            counter++;
        }
        return uniqueId;
    }
}
