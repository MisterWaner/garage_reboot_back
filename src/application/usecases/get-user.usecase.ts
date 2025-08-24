import { UserRepository } from '../repositories/user.repository.js';

export class GetUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async byId(userId: number) {
        return this.userRepository.findUserById(userId);
    }

    async byEmail(email: string) {
        return this.userRepository.findUserByEmail(email);
    }
}
