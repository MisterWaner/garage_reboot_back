import { Car } from "../../domain/car/Car.js";

export abstract class CarRepository {
    abstract saveCar(car: Car): Promise<void>;
    abstract findAllCars(): Promise<Car[]>;
    abstract findCarById(id: string): Promise<Car | null>;
    abstract findCarByReference(reference: string): Promise<Car | null>;
    abstract deleteCar(id: string): Promise<void>;
}