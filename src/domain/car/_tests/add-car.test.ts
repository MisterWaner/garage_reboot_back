import { describe, beforeEach, expect, it } from 'vitest';
import { CarInMemoryRepository } from '../../../infrastructure/memory/car.inmemory.repository.js';
import { CarReferenceGenerator } from '../CarReferenceGenerator.js';
import { User, Role } from '../../user/User.js';
import { CarFactory } from '../CarFactory.js';
import { Motorisation, FuelType, Car } from '../Car.js';
import type { CreateCarDTO } from '../CarFactory.js';
import { AddCarUseCase } from '../../../application/usecases/car/add-car.usecase.js';

import { UserInMemoryRepository } from '../../../infrastructure/memory/user.inmemory.repository.js';
import { UniqueUserIdGenerator } from '../../user/UniqueUserIdGenerator.js';
import { UserFactory } from '../../user/UserFactory.js';
import type { CreateUserDTO } from '../../user/UserFactory.js';
import { CreateUserUseCase } from '../../../application/usecases/user/create-user.usecase.js';

describe('Feature: Add a car', () => {
    let carRepository: CarInMemoryRepository;
    let userRepository: UserInMemoryRepository;
    let userFactory: UserFactory;
    let carFactory: CarFactory;
    let addCarUseCase: AddCarUseCase;

    beforeEach(async () => {
        //init user repository and factory
        userRepository = new UserInMemoryRepository();
        const uniqueIdGenerator = new UniqueUserIdGenerator(userRepository);
        userFactory = new UserFactory(uniqueIdGenerator);

        //init car repository and factory
        carRepository = new CarInMemoryRepository();
        const uniqueCarReference = new CarReferenceGenerator(carRepository);
        carFactory = new CarFactory(uniqueCarReference);

        //init add car use case
        addCarUseCase = new AddCarUseCase(carRepository, carFactory);
    });

    const makeUser = async () => {
        const user = await userFactory.create({
            firstname: 'Alice',
            lastname: 'Johnson',
            birthdate: new Date('1992-07-20'),
            role: Role.EMPLOYEE,
        });
        await userRepository.saveUser(user);
        return user;
    };

    it('Should add a new car with a unique reference and associate it with the user that added it', async () => {
        const user = await makeUser();

        const result = await addCarUseCase.execute(
            {
                immatriculation: 'EF-123-AB',
                brand: 'Toyota',
                model: 'Corolla',
                year: 2020,
                kilometers: 25000,
                price: 10000,
                images: ['image1.jpg', 'image2.jpg'],
                motorisation: Motorisation.MANUAL,
                fuelType: FuelType.ESSENCE,
                color: 'Red',
            },
            user
        );

        const storedCar = await carRepository.findCarById(result.car.getId());

        expect(storedCar?.getReference()).toEqual('2025-TOYOTA-COROLLA');
        expect(storedCar?.getAddedBy()).toEqual(user?.getId());
    });

    it('should generate a unique reference when a duplicate exists', async () => {
        const user = await makeUser();

        const result = await addCarUseCase.execute(
            {
                immatriculation: 'EF-123-AB',
                brand: 'Toyota',
                model: 'Corolla',
                year: 2020,
                kilometers: 25000,
                price: 10000,
                images: ['image1.jpg', 'image2.jpg'],
                motorisation: Motorisation.MANUAL,
                fuelType: FuelType.ESSENCE,
                color: 'Red',
            },
            user
        );

        const result2 = await addCarUseCase.execute(
            {
                immatriculation: 'GH-123-AB',
                brand: 'Toyota',
                model: 'Corolla',
                year: 2020,
                kilometers: 25000,
                price: 10000,
                images: ['image1.jpg', 'image2.jpg'],
                motorisation: Motorisation.MANUAL,
                fuelType: FuelType.ESSENCE,
                color: 'Red',
            },
            user
        );

        expect(result.car.getReference()).toBe('2025-TOYOTA-COROLLA');
        expect(result2.car.getReference()).toBe('2025-TOYOTA-COROLLA-1');
    });

    it('should throw if year is invalid', async () => {
        const user = await makeUser();

        const createCar = async () => {
            await addCarUseCase.execute(
                {
                    immatriculation: 'EF-123-AB',
                    brand: 'Toyota',
                    model: 'Corolla',
                    year: 1800,
                    kilometers: 25000,
                    price: 10000,
                    images: ['image1.jpg', 'image2.jpg'],
                    motorisation: Motorisation.MANUAL,
                    fuelType: FuelType.ESSENCE,
                    color: 'Red',
                },
                user
            );
        };

        await expect(createCar()).rejects.toThrowError('Année invalide');
    });
});
