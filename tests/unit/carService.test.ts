import { describe, it, expect, beforeEach } from 'vitest';
import { CarService } from '../../src/domain/car/car.service';
import { CarStatus, FuelType, Motorisation } from '../../src/domain/car/car.entity';
import { CarInMemoryRepository } from '../../src/infrastructure/memory/car.inmemory.repository';

let service: CarService;

beforeEach(() => {
    service = new CarService(new CarInMemoryRepository());
})

describe('CarService.getAllCars', () => {
    it('should return all cars', async () => {
        const cars = await service.getAllCars();

        expect(cars).toEqual([
            {
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
            },
            {
                id: 'CAR-124',
                brand: 'Honda',
                model: 'Civic',
                year: 2019,
                color: 'Red',
                images: ['https://example.com/car2.jpg'],
                kilometers: 20000,
                reference: 'CAR-124',
                price: 22000,
                fuelType: FuelType.DIESEL,
                motorisation: Motorisation.MANUAL,
                status: CarStatus.AVAILABLE,
                addedBy: 2,
                createdAt: new Date().getDate().toString(),
            },
        ]);
    })
})

describe('CarService.getCarById', () => {
    it('should return a car by id', async () => {
        const car = await service.getCarById('CAR-123');
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
    })
})