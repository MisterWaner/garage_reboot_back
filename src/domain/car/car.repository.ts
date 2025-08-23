import type { CarResponse } from "./car.entity.js";

export interface CarRepository {
    getAllCars(): Promise<CarResponse[]>;
    getCarById(id: string): Promise<CarResponse | null>;
}
