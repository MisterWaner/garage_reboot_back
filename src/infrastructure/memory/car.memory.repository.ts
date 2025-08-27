import { CarRepository } from '../../application/repositories/car.repository.js';
import { Car } from '../../domain/models/Car.js';

export class InMemoryCarRepository implements CarRepository {
    cars = new Map<string, Car>();

    async create(car: Car): Promise<void> {
        if (this.cars.has(car.getId())) {
            throw new Error('Une voiture avec cet ID existe déjà.');
        }
        this.cars.set(car.getId(), car);
    }
    findAllCars(): Promise<Car[]> {
        return Promise.resolve(Array.from(this.cars.values()));
    }
    findCarById(id: string): Promise<Car | null> {
        const car = this.cars.get(id);
        return Promise.resolve(car || null);
    }
    findCarByReference(reference: string): Promise<Car | null> {
        const car = Array.from(this.cars.values()).find(car => car.getReference() === reference);
        return Promise.resolve(car || null);
    }
    updateCar(id: string, car: Partial<Car>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    deleteCar(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}