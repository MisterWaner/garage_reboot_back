import { describe, it, expect, beforeEach } from 'vitest';
import { CarStatus, Motorisation, FuelType } from '../../src/domain/car/Car';
import { CarFactory } from '../../src/domain/car/CarFactory';
import { CarInMemoryRepository } from '../../src/infrastructure/memory/car.inmemory.repository';

describe('Car Entity & Factory', () => {
    it('should create a car with immatriculation as ID', () => {
        const car = CarFactory.create({
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
        });

        expect(car.getId()).toBe('AB-123-CD');
        expect(car.getReference()).toMatch(/^CAR-\d{4}-\d{4}$/); // Reference format CAR-XXXX-XXXX
    });

    it('should update price correctly', () => {
        const car = CarFactory.create({
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
        });

        car.updatePrice(22000, 2);

        expect(car.getPrice()).toBe(22000);
        expect(car.getUpdatedBy()).toBe(2);
        expect(car.getUpdatedAt()).toBeDefined();
    });

    it('should change status correctly', () => {
        const car = CarFactory.create({
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
        });

        car.changeStatus(CarStatus.SOLD, 2);

        expect(car.getStatus()).toBe(CarStatus.SOLD);
        expect(car.getUpdatedBy()).toBe(2);
        expect(car.getUpdatedAt()).toBeDefined();
    });
});

describe("Car Repository", () => {
    it("should save and retrieve a car", async () => {
        const repo = new CarInMemoryRepository

        const car = CarFactory.create({
            immatriculation: 'DE-456-EF',
            brand: 'Honda',
            model: 'Civic',
            year: 2019,
            kilometers: 20000,
            price: 18000,
            images: ['https://example.com/car2.jpg'],
            motorisation: Motorisation.MANUAL,
            fuelType: FuelType.DIESEL,
            color: 'Blue',
        });

        await repo.save(car);

        const retrievedCar = await repo.findById('DE-456-EF');
        expect(retrievedCar).toEqual(car);
        expect(retrievedCar?.getId()).toBe('DE-456-EF');
        expect(retrievedCar).not.toBeNull();
    });

    it("should prevent duplicate immatriculation", async () => {
        const repo = new CarInMemoryRepository();

        const car1 = CarFactory.create({
            immatriculation: 'DE-456-EF',
            brand: 'Honda',
            model: 'Civic',
            year: 2019,
            kilometers: 20000,
            price: 18000,
            images: ['https://example.com/car2.jpg'],
            motorisation: Motorisation.MANUAL,
            fuelType: FuelType.DIESEL,
            color: 'Blue',
        });

        const car2 = CarFactory.create({
            immatriculation: 'DE-456-EF',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            kilometers: 15000,
            price: 20000,
            images: ['https://example.com/car1.jpg'],
            motorisation: Motorisation.AUTOMATIC,
            fuelType: FuelType.ESSENCE,
            color: 'Red',
        });

        await repo.save(car1);

        await expect(repo.save(car2)).rejects.toThrowError('Une voiture avec cet ID existe déjà.');
    });
})
