export enum CarStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
    IN_MAINTENANCE = 'in_maintenance'
}

export enum Motorisation {
    MANUAL = 'manual',
    AUTOMATIC = 'automatic'
}

export enum FuelType {
    ESSENCE = 'essence',
    DIESEL = 'diesel',
    ELECTRIC = 'electric',
    HYBRID = 'hybrid'
}

export class Car {
    private readonly id: string;
    private brand: string;
    private model: string;
    private year: number;
    private status: CarStatus;
    private motorisation: Motorisation;
    private fuelType: FuelType;
    private mileage: number;
    private price: number;
    private images: string[];
    private color: string;
    private reference: string;
    private addedBy?: string | undefined;
    private updatedBy?: string | undefined;
    private readonly createdAt: string | undefined;
    private updatedAt?: string | undefined;

    constructor(props: {
        immatriculation: string;
        brand: string;
        model: string;
        year: number;
        status: CarStatus;
        motorisation: Motorisation;
        fuelType: FuelType;
        mileage: number;
        price: number;
        images: string[];
        color: string;
        reference: string;
        addedBy?: string;
        updatedBy?: string;
        createdAt?: string;
        updatedAt?: string;
    }) {
        this.validateYear(props.year);
        this.validateMileage(props.mileage);
        this.validatePrice(props.price);

        this.id = props.immatriculation;
        this.brand = props.brand;
        this.model = props.model;
        this.year = props.year;
        this.status = props.status;
        this.motorisation = props.motorisation;
        this.fuelType = props.fuelType;
        this.mileage = props.mileage;
        this.price = props.price;
        this.images = props.images;
        this.color = props.color;
        this.reference = props.reference;
        this.addedBy = props.addedBy;
        this.updatedBy = props.updatedBy;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    private validateYear(year: number) {
        if (year < 1886 || year > new Date().getFullYear()) {
            throw new Error('Invalid year');
        }
    }

    private validateMileage(mileage: number) {
        if (mileage < 0) {
            throw new Error('Invalid mileage');
        }
    }

    private validatePrice(price: number) {
        if (price < 0) {
            throw new Error('Invalid price');
        }
    }

    // Getters
    getId(): string {
        return this.id;
    }

    getBrand(): string {
        return this.brand;
    }

    getModel(): string {
        return this.model;
    }

    getYear(): number {
        return this.year;
    }

    getStatus(): CarStatus {
        return this.status;
    }

    getMotorisation(): Motorisation {
        return this.motorisation;
    }

    getFuelType(): FuelType {
        return this.fuelType;
    }

    getMileage(): number {
        return this.mileage;
    }

    getPrice(): number {
        return this.price;
    }

    getImages(): string[] {
        return this.images;
    }

    getColor(): string {
        return this.color;
    }

    getReference(): string {
        return this.reference;
    }

    getAddedBy(): string | undefined {
        return this.addedBy;
    }

    getUpdatedBy(): string | undefined {
        return this.updatedBy;
    }

    getCreatedAt(): string | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): string | undefined {
        return this.updatedAt;
    }
}