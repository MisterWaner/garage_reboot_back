import { describe, beforeEach, expect, it } from "vitest";
import { InMemoryCarRepository } from "../../../../infrastructure/memory/car.memory.repository.js";
import { CarReferenceGenerator } from "../features/CarReferenceGenerator.js";
import { User, Role } from "../../../models/User.js";
import { CarFactory } from "../CarFactory.js";
import { Motorisation, FuelType, CarStatus } from "../../../models/Car.js";
import type { CreateCarDTO } from "../CarFactory.js";
import { InMemoryUserRepository } from "../../../../infrastructure/memory/user.memory.repository.js";
import { UniqueUserIdGenerator } from "../../user/features/UniqueUserIdGenerator.js";
import { UserFactory } from "../../user/UserFactory.js";
import type { CreateUserDTO } from "../../user/UserFactory.js";
import { CreateUserUseCase } from "../../user/usecases/create-user.usecase.js";
import type { AddCarUseCase } from "../usecases/add-car.usecase.js";

describe("Feature: Add a car", () => {
    let carRepository: InMemoryCarRepository
    let userRepository: InMemoryUserRepository
    let userFactory: UserFactory
    let carFactory: CarFactory
    let addCar: AddCarUseCase

    beforeEach(async () => {
        // init user
        userRepository = new InMemoryUserRepository();
        const userIdGenerator = new UniqueUserIdGenerator(userRepository);
        userFactory = new UserFactory(userIdGenerator);

        // init Car
        carRepository = new InMemoryCarRepository();
        const carReferenceGenerator = new CarReferenceGenerator(carRepository);
        carFactory = new CarFactory(carReferenceGenerator);
    })

    it('Should create a new car', async () => {
        const createdCar = await carFactory.createCar({
            immatriculation: 'EF-123-AB',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            mileage: 25000,
            price: 10000,
            images: ['image1.jpg', 'image2.jpg'],
            motorisation: Motorisation.MANUAL,
            fuelType: FuelType.ESSENCE,
            color: 'Red',
        });

        expect(createdCar.getReference()).toEqual('2025-TOYOTA-COROLLA')
        expect(createdCar.getStatus()).toBe(CarStatus.AVAILABLE);
        expect(createdCar.getId()).toEqual('EF-123-AB');
    })
})