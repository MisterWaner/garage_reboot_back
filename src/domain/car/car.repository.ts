import { Car } from "./Car.js";

export interface CarRepository {
    save(car: Car): Promise<void>;
    findAll(): Promise<Car[]>;
    findById(id: string): Promise<Car | null>;
    delete(id: string): Promise<void>;
}
