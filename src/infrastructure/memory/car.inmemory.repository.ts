import type { CarRepository } from '../../domain/car/car.repository.js';
import type { CarResponse } from '../../domain/car/car.entity.js';
import {
    CarStatus,
    Motorisation,
    FuelType,
} from '../../domain/car/car.entity.js';

export class CarInMemoryRepository implements CarRepository {
    private cars: CarResponse[] = [
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
            images: ['https://example.com/car2.jpg'],
            year: 2019,
            color: 'Red',
            kilometers: 20000,
            reference: 'CAR-124',
            price: 22000,
            fuelType: FuelType.DIESEL,
            motorisation: Motorisation.MANUAL,
            status: CarStatus.AVAILABLE,
            addedBy: 2,
            createdAt: new Date().getDate().toString(),
        },
    ];

    async getAllCars(): Promise<CarResponse[]> {
        return this.cars;
    }

    async getCarById(id: string): Promise<CarResponse | null> {
        return this.cars.find((car) => car.id === id) || null;
    }
}
