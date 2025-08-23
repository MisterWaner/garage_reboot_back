import type { CarRepository } from "../../domain/car/car.repository.js";
import { Car } from "../../domain/car/Car.js";

export class GetCarByIdUseCase {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(id: string): Promise<Car | null> {
        return this.carRepository.findById(id);
    }
}
