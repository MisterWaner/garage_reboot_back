import { CarRepository } from '../../../../application/repositories/car.repository.js';
import type { CarReferenceService } from '../CarReferenceService.js';

export class CarReferenceGenerator implements CarReferenceService {
    constructor(private readonly carRepository: CarRepository) {}

    private baseReference(brand: string, model: string): string {
        const now = new Date();
        const firstPart = now.getFullYear().toString();
        const secondPart = brand.trim().toUpperCase().replace(/\s+/g, '_');
        const thirdPart = model.trim().toUpperCase().replace(/\s+/g, '_');
        return `${firstPart}-${secondPart}-${thirdPart}`;
    }

    async generateUniqueReference(
        brand: string,
        model: string
    ): Promise<string> {
        const base = this.baseReference(brand, model);
        let unique = base;
        let counter = 1;

        while (await this.carRepository.findCarByReference(unique)) {
            unique = `${base}-${counter}`;
            counter++;
        }

        return unique;
    }
}
