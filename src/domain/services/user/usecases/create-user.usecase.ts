import { UserRepository } from "../../../../application/repositories/user.repository.js";
import { UserFactory } from "../UserFactory.js";
import type { CreateUserDTO } from "../UserFactory.js";
import { User } from "../../../models/User.js";

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository, private readonly userFactory: UserFactory) {}

    async execute(data: CreateUserDTO): Promise<User> {
        const user = await this.userFactory.createUser(data);
        await this.userRepository.create(user);

        return user;
    }
}