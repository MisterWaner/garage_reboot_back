import { Car, CarStatus, Motorisation, FuelType } from './Car.js';
import { User } from '../user/User.js';

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
    private static counter = 0;

    public static create(data: CreateCarDTO): Car {
        const reference = this.generateReference();

        return new Car({
            immatriculation: data.immatriculation,
            brand: data.brand,
            model: data.model,
            year: data.year,
            kilometers: data.kilometers,
            price: data.price,
            images: data.images,
            motorisation: data.motorisation,
            fuelType: data.fuelType,
            color: data.color,
            addedBy: data.addedBy?.getId() ?? 0,
            status: CarStatus.AVAILABLE,
            reference,
        });
    }

    private static generateReference(): string {
        const year = new Date().getFullYear();
        this.counter++;
        return `CAR-${year}-${this.counter.toString().padStart(4, '0')}`;
    }
}
