import { UserRepository } from '../../repositories/user.repository.js';

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: string) {
        return this.userRepository.deleteUser(userId);
    }
}
