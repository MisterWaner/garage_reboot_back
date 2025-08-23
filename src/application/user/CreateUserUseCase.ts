import { UserFactory } from "../../domain/user/UserFactory.js";
import type { CreateUserDTO } from "../../domain/user/UserFactory.js";
import type { UserRepository } from "../../domain/user/user.repository.js";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<void> {
        const user = UserFactory.create(data);
        await this.userRepository.save(user);
    }
}