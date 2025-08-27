import type { CreateCarDTO } from '../CarFactory.js';
import { Car } from '../../../models/Car.js';
import { CarFactory } from '../CarFactory.js';
import { CarRepository } from '../../../../application/repositories/car.repository.js';
import { User } from '../../../models/User.js';

interface AddCarResponse {
    car: Car;
}

export class AddCarUseCase {
    constructor(
        private readonly carRepository: CarRepository,
        private readonly carFactory: CarFactory
    ) {}

    async execute(
        data: Omit<CreateCarDTO, 'addedBy'>,
        user: User
    ): Promise<AddCarResponse> {
        const car = await this.carFactory.createCar({
            brand: data.brand,
            model: data.model,
            immatriculation: data.immatriculation,
            year: data.year,
            mileage: data.mileage,
            price: data.price,
            images: data.images,
            motorisation: data.motorisation,
            fuelType: data.fuelType,
            color: data.color,
            addedBy: user,
        });

        await this.carRepository.create(car);

        return { car };
    }
}
