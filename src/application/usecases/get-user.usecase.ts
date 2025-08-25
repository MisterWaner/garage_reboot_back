import { UserRepository } from '../repositories/user.repository.js';

export class GetUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async all() {
        return this.userRepository.findAllUsers();
    }

    async byId(userId: string) {
        return this.userRepository.findUserById(userId);
    }

    async byEmail(email: string) {
        return this.userRepository.findUserByEmail(email);
    }
}
