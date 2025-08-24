import { CarRepository } from '../../application/repositories/car.repository.js';
import { Car } from '../../domain/car/Car.js';

export class CarInMemoryRepository implements CarRepository {
    private cars: Map<string, Car> = new Map();

    async saveCar(car: Car): Promise<void> {
        if (this.cars.has(car.getId())) {
            throw new Error('Une voiture avec cet ID existe déjà.');
        }
        this.cars.set(car.getId(), car);
    }
    async findAllCars(): Promise<Car[]> {
        return Array.from(this.cars.values());
    }
    async findCarById(id: string): Promise<Car | null> {
        return this.cars.get(id) || null;
    }
    async deleteCar(id: string): Promise<void> {
        this.cars.delete(id);
    }
}
