import type { UserRepository } from '../../domain/user/user.repository.js';

export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: number) {
        return this.userRepository.findById(userId);
    }
}
