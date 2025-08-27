import { Car, CarStatus, Motorisation, FuelType } from '../../models/Car.js';
import { User } from '../../models/User.js';
import type { CarReferenceService } from './CarReferenceService.js';

export interface CreateCarDTO {
    immatriculation: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
    price: number;
    images: string[];
    motorisation: Motorisation;
    fuelType: FuelType;
    addedBy?: User;
}

export class CarFactory {
    constructor(private readonly carReferenceService: CarReferenceService) {}

    async createCar(data: CreateCarDTO): Promise<Car> {
        const reference =
            await this.carReferenceService.generateUniqueReference(
                data.brand,
                data.model
            );

        const newCar = new Car({
            immatriculation: data.immatriculation,
            brand: data.brand,
            model: data.model,
            year: data.year,
            color: data.color,
            mileage: data.mileage,
            price: data.price,
            images: data.images,
            motorisation: data.motorisation,
            fuelType: data.fuelType,
            status: CarStatus.AVAILABLE,
            reference,
            addedBy: data.addedBy ? data.addedBy.getId() : '',
            createdAt: new Date().toISOString(),
        });

        return newCar;
    }
}
