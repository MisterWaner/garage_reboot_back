import { UserRepository } from "../repositories/user.repository.js";
import type { CreateUserDto } from "../dto/user.dto.js";

export class UserService {
    constructor(private repo: UserRepository) {}

    getAllUsers() {
        return this.repo.getAll();
    }

    createUser(dto: CreateUserDto) {
        return this.repo.create(dto);
    }

    clearUsers() {
        this.repo.clear();
    }
}