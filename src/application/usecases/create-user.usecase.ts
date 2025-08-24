import { UserRepository } from "../repositories/user.repository.js";
import { UserFactory } from "../../domain/user/UserFactory.js";
import type { CreateUserDTO } from "../../domain/user/UserFactory.js";

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<void> {
        const user = UserFactory.create(data);
        await this.userRepository.saveUser(user);
    }
}