import { Car } from "../../domain/models/Car.js";

export abstract class CarRepository {
    abstract create(car: Car): Promise<void>;
    abstract findAllCars(): Promise<Car[]>;
    abstract findCarById(id: string): Promise<Car | null>;
    abstract findCarByReference(reference: string): Promise<Car | null>;
    abstract updateCar(id: string, car: Partial<Car>): Promise<void>;
    abstract deleteCar(id: string): Promise<void>;
}