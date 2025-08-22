import { z } from 'zod';

export enum CarStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
}

export enum Motorisation {
    MANUAL = 'manual',
    AUTOMATIC = 'automatic',
}

export enum FuelType {
    ESSENCE = 'essence',
    DIESEL = 'diesel',
    ELECTRIC = 'electric',
    HYBRID = 'hybrid',
}

const carCore = {
    brand: z.string().min(2).max(75).trim(),
    model: z.string().min(2).max(75).trim(),
    year: z.number().min(1886).max(new Date().getFullYear()),
    status: z.enum([CarStatus.AVAILABLE, CarStatus.SOLD]),
    kilometers: z.number().min(0).positive(),
    price: z.number().min(0).positive(),
    images: z.array(z.url()),
    motorisation: z.enum([Motorisation.MANUAL, Motorisation.AUTOMATIC]),
    fuelType: z.enum([
        FuelType.ESSENCE,
        FuelType.DIESEL,
        FuelType.ELECTRIC,
        FuelType.HYBRID,
    ]),
    color: z.string().min(2).max(30).trim(),
    reference: z.string().min(2).max(100).trim(),
};

const CreateCarDTOSchema = z.object({
    ...carCore,
    addedBy: z.number(),
    createdAt: z.string(),
});

const carResponseSchema = z.object({
    ...CreateCarDTOSchema.shape,
    id: z.string().max(12),
});

const UpdatedCarDTOSchema = z.object({
    ...carCore,
    id: z.string().max(12),
    updatedAt: z.string(),
});

export type CreateCarInput = z.infer<typeof CreateCarDTOSchema>;
export type CarResponse = z.infer<typeof carResponseSchema>;
export type UpdatedCarInput = z.infer<typeof UpdatedCarDTOSchema>;
