import type { CarRepository } from './car.repository.js';
import type { CarResponse } from './car.entity.js';

export class CarService {
    constructor(private carRepository: CarRepository) {}

    async getAllCars(): Promise<CarResponse[]> {
        return this.carRepository.getAllCars();
    }

    async getCarById(id: string): Promise<CarResponse | null> {
        return this.carRepository.getCarById(id);
    }
}
