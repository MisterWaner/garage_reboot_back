import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from '../../src/domain/user/user.service';
import { UserInMemoryRepository } from '../../src/infrastructure/memory/user.inmemory.repository';
import { Role } from '../../src/domain/user/user.entity';
import { CarStatus, FuelType, Motorisation } from '../../src/domain/car/car.entity';
import { CarService } from '../../src/domain/car/car.service';
import { CarInMemoryRepository } from '../../src/infrastructure/memory/car.inmemory.repository';

let service: UserService;
let carService: CarService;

beforeEach(() => {
    service = new UserService(new UserInMemoryRepository());
    carService = new CarService(new CarInMemoryRepository());
});

describe('UserService.createUser', () => {
    it('should fail if required fields are missing', async () => {
        await expect(
            service.createUser({
                firstname: '',
                lastname: '',
                role: Role.EMPLOYEE,
            })
        ).rejects.toThrow('Missing required fields');
    });

    it('should create a user if all required fields are provided', async () => {
        const user = await service.createUser({
            firstname: 'John',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        });

        expect(user).toEqual({
            id: expect.any(Number),
            firstname: 'John',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        });
    });
});

describe('UserService.getUserById', () => {
    it('should return a user by id', async () => {
        const createdUser = await service.createUser({
            firstname: 'Jane',
            lastname: 'Doe',
            role: Role.ADMIN,
        });

        const user = await service.getUserById(createdUser.id);

        expect(user).toEqual({
            id: createdUser.id,
            firstname: 'Jane',
            lastname: 'Doe',
            role: Role.ADMIN,
        });
    });
});

describe('UserService.getAllUsers', () => {
    it('should return all users', async () => {

        const users = await service.getAllUsers();

        expect(users).toEqual([
            {
                id: 1,
                firstname: 'Alice',
                lastname: 'Doe',
                email: 'alice@example.com',
                role: Role.EMPLOYEE,
            },
            {
                id: 2,
                firstname: 'Bob',
                email: 'bob@example.com',
                lastname: 'Smith',
                role: Role.ADMIN,
            },
        ]);
    });
});

describe('UserService.deleteUser', () => {
    it('should delete a user by id', async () => {
        const createdUser = await service.createUser({
            firstname: 'John',
            lastname: 'Doe',
            role: Role.EMPLOYEE,
        });

        await service.deleteUser(createdUser.id);

        await expect(service.getUserById(createdUser.id)).rejects.toThrow('User not found');
    });
});

describe('UserService.addCar', () => {
    it('a user should add a car', async () => {
        const car = await service.addCar({
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            status: CarStatus.AVAILABLE,
            kilometers: 15000,
            price: 20000,
            images: ['https://example.com/car1.jpg'],
            motorisation: Motorisation.AUTOMATIC,
            fuelType: FuelType.ESSENCE,
            color: 'Red',
            reference: 'CAR-123',
            addedBy: 1,
            createdAt: new Date().getDate().toString(),
        });

        expect(car).toEqual({
            id: 'CAR-123',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            status: CarStatus.AVAILABLE,
            kilometers: 15000,
            price: 20000,
            images: ['https://example.com/car1.jpg'],
            motorisation: Motorisation.AUTOMATIC,
            fuelType: FuelType.ESSENCE,
            color: 'Red',
            reference: 'CAR-123',
            addedBy: 1,
            createdAt: new Date().getDate().toString(),
        });
    });
})

describe('UserService.updateCar', () => {
    it('should update a car', async () => {
        const selectedCar = await carService.getCarById('CAR-123');
        const userId = (await service.getUserById(2))?.id;

        if (!selectedCar) {
            throw new Error('Car not found');
        }

        const updatedCar = await service.updateCar({
            id: 'CAR-123',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            status: CarStatus.AVAILABLE,
            kilometers: 15000,
            price: 20000,
            images: ['https://example.com/car1.jpg'],
            motorisation: Motorisation.AUTOMATIC,
            fuelType: FuelType.ESSENCE,
            reference: 'CAR-123',
            color: 'Blue',
            updatedAt: new Date().getDate().toString(),
            updatedBy: userId || 2,
        });

        expect(updatedCar).toEqual({
            ...selectedCar,
            color: 'Blue',
            updatedAt: new Date().getDate().toString(),
            updatedBy: 2
        })
    })
})

describe('UserService.deleteCar', () => {
    it('should delete a car by id', async () => {
        await service.deleteCar('CAR-123');
    })
});