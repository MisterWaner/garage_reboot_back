import { UserInMemoryRepository } from "./infrastructure/memory/user.inmemory.repository.js";
import { UniqueUserIdGenerator } from "./domain/user/UniqueUserIdGenerator.js";
import { UserFactory } from "./domain/user/UserFactory.js";
import { CreateUserUseCase } from "./application/usecases/create-user.usecase.js";

const userRepository = new UserInMemoryRepository();
const userIdGenerator = new UniqueUserIdGenerator(userRepository);
const userFactory = new UserFactory(userIdGenerator);

const createUserUseCase = new CreateUserUseCase(userRepository, userFactory);

export const app = {
    useCases: {
        createUser: createUserUseCase
    }
}
