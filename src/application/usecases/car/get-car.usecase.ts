import { CarRepository } from '../../repositories/car.repository.js';
import { Car } from '../../../domain/car/Car.js';

export class GetCarUseCase {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(id: string): Promise<Car | null> {
        return this.carRepository.findCarById(id);
    }
}
