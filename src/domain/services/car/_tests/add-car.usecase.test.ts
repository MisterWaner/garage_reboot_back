import { describe, beforeEach, expect, it } from 'vitest';
import { InMemoryCarRepository } from '../../../../infrastructure/memory/car.memory.repository.js';
import { CarReferenceGenerator } from '../features/CarReferenceGenerator.js';
import { User, Role } from '../../../models/User.js';
import { CarFactory } from '../CarFactory.js';
import { Motorisation, FuelType, CarStatus } from '../../../models/Car.js';
import type { CreateCarDTO } from '../CarFactory.js';
import { InMemoryUserRepository } from '../../../../infrastructure/memory/user.memory.repository.js';
import { UniqueUserIdGenerator } from '../../user/features/UniqueUserIdGenerator.js';
import { UserFactory } from '../../user/UserFactory.js';
import type { CreateUserDTO } from '../../user/UserFactory.js';
import { CreateUserUseCase } from '../../user/usecases/create-user.usecase.js';
import { AddCarUseCase } from '../usecases/add-car.usecase.js';

describe('Use case: AddCarUseCase', () => {
    let carRepository: InMemoryCarRepository;
    let userRepository: InMemoryUserRepository;
    let userFactory: UserFactory;
    let carFactory: CarFactory;
    let addCar: AddCarUseCase;

    beforeEach(async () => {
        // init user
        userRepository = new InMemoryUserRepository();
        const userIdGenerator = new UniqueUserIdGenerator(userRepository);
        userFactory = new UserFactory(userIdGenerator);

        // init Car
        carRepository = new InMemoryCarRepository();
        const carReferenceGenerator = new CarReferenceGenerator(carRepository);
        carFactory = new CarFactory(carReferenceGenerator);

        // init use case
        addCar = new AddCarUseCase(carRepository, carFactory);
    });

    const makeUser = async () => {
        const user = await userFactory.createUser({
            firstname: 'Alice',
            lastname: 'Wonderland',
            birthdate: new Date('1990-01-01'),
            role: Role.EMPLOYEE,
        });

        await userRepository.create(user);

        return user;
    };

    it('Should add a new car with a unique reference and associate it with the user that added it', async () => {
        const user = await makeUser();

        const result = await addCar.execute(
            {
                immatriculation: 'AB-123-CD',
                brand: 'Honda',
                model: 'Civic',
                year: 2019,
                mileage: 30000,
                price: 15000,
                images: ['image1.jpg', 'image2.jpg'],
                motorisation: Motorisation.AUTOMATIC,
                fuelType: FuelType.DIESEL,
                color: 'Blue',
            },
            user
        );

        const storedCar = await carRepository.findCarById(result.car.getId());

        expect(storedCar?.getReference()).toBe('2025-HONDA-CIVIC');
        expect(storedCar?.getAddedBy()).toBe(user.getId());
    });

    it('Should add mutliple cars with unique references even if they have same brand/model/year', async () => {
        const user = await makeUser();

        const result = await addCar.execute(
            {
                immatriculation: 'AB-123-CD',
                brand: 'Honda',
                model: 'Civic',
                year: 2019,
                mileage: 30000,
                price: 15000,
                images: ['image1.jpg', 'image2.jpg'],
                motorisation: Motorisation.AUTOMATIC,
                fuelType: FuelType.DIESEL,
                color: 'Blue',
            },
            user
        );

        const result2 = await addCar.execute(
            {
                immatriculation: 'EF-456-GH',
                brand: 'Honda',
                model: 'Civic',
                year: 2019,
                mileage: 30000,
                price: 15000,
                images: ['image1.jpg', 'image2.jpg'],
                motorisation: Motorisation.AUTOMATIC,
                fuelType: FuelType.DIESEL,
                color: 'Pink',
            },
            user
        );

        expect(result.car.getReference()).toBe('2025-HONDA-CIVIC');
        expect(result2.car.getReference()).toBe('2025-HONDA-CIVIC-1');
    });
});
