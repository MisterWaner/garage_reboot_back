import { describe, beforeEach, it, expect } from 'vitest';
import { CarInMemoryRepository } from '../../src/infrastructure/memory/car.inmemory.repository';
import { Motorisation, FuelType, CarStatus } from '../../src/domain/car/Car';
import { AddCarUseCase } from '../../src/application/usecases/add-car.usecase';
import { GetUserUseCase } from '../../src/application/usecases/get-user.usecase';
import { UserInMemoryRepository } from '../../src/infrastructure/memory/user.inmemory.repository';

describe('AddCarUseCase', () => {
    let userRepo: UserInMemoryRepository;
    let carRepo: CarInMemoryRepository;
    let addCarUseCase: AddCarUseCase;
    let getUserUseCase: GetUserUseCase;

    beforeEach(() => {
        userRepo = new UserInMemoryRepository();
        carRepo = new CarInMemoryRepository();
        addCarUseCase = new AddCarUseCase(carRepo);
        getUserUseCase = new GetUserUseCase(userRepo);
    });

    it('should add a new car with immatriculation as ID and generate reference', async () => {
        const user = await getUserUseCase.byId(1);
        const car = await addCarUseCase.execute(
            {
                immatriculation: 'AB-123-CD',
                brand: 'Toyota',
                model: 'Corolla',
                year: 2020,
                kilometers: 15000,
                price: 20000,
                images: ['https://example.com/car1.jpg'],
                motorisation: Motorisation.AUTOMATIC,
                fuelType: FuelType.ESSENCE,
                color: 'Red',
            },
            user!
        );

        expect(car.car.getId()).toBe('AB-123-CD');
        expect(car.car.getReference()).toMatch(/^CAR-\d{4}-\d{4}$/); // Reference format CAR-XXXX-XXXX
        expect(car.car.getStatus()).toBe(CarStatus.AVAILABLE);
        expect(car.car.getAddedBy()).toBe(1);

        const stored = await carRepo.findCarById('AB-123-CD');
        expect(stored).not.toBeNull();
        expect(stored?.getId()).toBe('AB-123-CD');
    });

    it('should not allowing adding a car with same immatriculation twice', async () => {
        const user = await getUserUseCase.byId(1);
        const firstCar = await addCarUseCase.execute(
            {
                immatriculation: 'EF-456-GH',
                brand: 'Honda',
                model: 'Civic',
                year: 2019,
                kilometers: 20000,
                price: 18000,
                images: ['https://example.com/car2.jpg'],
                motorisation: Motorisation.MANUAL,
                fuelType: FuelType.DIESEL,
                color: 'Blue',
            },
            user!
        );

        expect(firstCar.car.getId()).toBe('EF-456-GH');

        await expect(
            addCarUseCase.execute(
                {
                    immatriculation: 'EF-456-GH',
                    brand: 'Renault',
                    model: 'Clio',
                    year: 2006,
                    kilometers: 250000,
                    price: 6000,
                    images: ['https://example.com/car2.jpg'],
                    motorisation: Motorisation.MANUAL,
                    fuelType: FuelType.DIESEL,
                    color: 'Blue',
                },
                user!
            )
        ).rejects.toThrow('Une voiture avec cet ID existe déjà.');
    });
});
