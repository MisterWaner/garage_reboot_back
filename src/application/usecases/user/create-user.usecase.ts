import { UserRepository } from '../../repositories/user.repository.js';
import { UserFactory } from '../../../domain/user/UserFactory.js';
import type { CreateUserDTO } from '../../../domain/user/UserFactory.js';
import type { User } from '../../../domain/user/User.js';

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userFactory: UserFactory
    ) {}

    async execute(data: CreateUserDTO): Promise<User> {
        const user = await this.userFactory.create(data);

        await this.userRepository.saveUser(user);
        return user;
    }
}
