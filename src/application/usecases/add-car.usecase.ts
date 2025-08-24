import type { CreateCarDTO } from '../../domain/car/CarFactory.js';
import { Car } from '../../domain/car/Car.js';
import { CarFactory } from '../../domain/car/CarFactory.js';
import { CarRepository } from '../repositories/car.repository.js';
import { User } from '../../domain/user/User.js';

interface AddCarResponse {
    car: Car;
}

export class AddCarUseCase {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(
        data: Omit<CreateCarDTO, 'addedBy'>,
        user: User
    ): Promise<AddCarResponse> {
        const car = CarFactory.create({
            brand: data.brand,
            immatriculation: data.immatriculation,
            model: data.model,
            year: data.year,
            kilometers: data.kilometers,
            price: data.price,
            images: data.images,
            motorisation: data.motorisation,
            fuelType: data.fuelType,
            color: data.color,
            addedBy: user,
        });

        await this.carRepository.saveCar(car);

        return { car };
    }
}
