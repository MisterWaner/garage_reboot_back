import type { CarRepository } from '../../domain/car/car.repository.js';
import { Car } from '../../domain/car/Car.js';

export class GetAllCarsUseCase {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(): Promise<Car[]> {
        return this.carRepository.findAll();
    }
}
