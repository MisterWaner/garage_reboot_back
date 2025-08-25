import { Car, CarStatus, Motorisation, FuelType } from './Car.js';
import { User } from '../user/User.js';
import { CarReferenceGenerator } from './CarReferenceGenerator.js';

export interface CreateCarDTO {
    immatriculation: string;
    brand: string;
    model: string;
    year: number;
    kilometers: number;
    price: number;
    images: string[];
    motorisation: Motorisation;
    fuelType: FuelType;
    color: string;
    addedBy?: User;
}
export class CarFactory {
    constructor(private readonly carReferenceGenerator: CarReferenceGenerator) {}

    async create(data: CreateCarDTO): Promise<Car> {
        const reference = await this.carReferenceGenerator.generateUniqueReference(data.brand, data.model);
        return new Car({
            immatriculation: data.immatriculation,
            brand: data.brand,
            model: data.model,
            year: data.year,
            status: CarStatus.AVAILABLE,
            kilometers: data.kilometers,
            price: data.price,
            images: data.images,
            motorisation: data.motorisation,
            fuelType: data.fuelType,
            color: data.color,
            reference: reference,
            addedBy: data.addedBy ? data.addedBy.getId() : "",
            createdAt: new Date().toISOString(),
        });
    }
}
