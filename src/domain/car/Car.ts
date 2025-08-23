export enum CarStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
    MAINTENANCE = 'maintenance',
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

export class Car {
    private readonly id: string;
    private brand: string;
    private model: string;
    private year: number;
    private status: CarStatus;
    private kilometers: number;
    private price: number;
    private images: string[];
    private motorisation: Motorisation;
    private fuelType: FuelType;
    private color: string;
    private reference: string;
    private addedBy?: number | undefined;
    private updatedBy?: number | undefined;
    private readonly createdAt: string | undefined;
    private updatedAt?: string | undefined;

    constructor(props: {
        immatriculation: string;
        brand: string;
        model: string;
        year: number;
        status: CarStatus;
        kilometers: number;
        price: number;
        images: string[];
        motorisation: Motorisation;
        fuelType: FuelType;
        color: string;
        reference: string;
        addedBy?: number;
        updatedBy?: number;
        createdAt?: string;
        updatedAt?: string;
    }) {
        this.validate(props);

        this.id = props.immatriculation;
        this.brand = props.brand;
        this.model = props.model;
        this.year = props.year;
        this.status = props.status;
        this.kilometers = props.kilometers;
        this.price = props.price;
        this.images = props.images;
        this.motorisation = props.motorisation;
        this.fuelType = props.fuelType;
        this.color = props.color;
        this.reference = props.reference;
        this.addedBy = props.addedBy;
        this.updatedBy = props.updatedBy;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    private validate(props: {
        year: number;
        kilometers: number;
        price: number;
    }) {
        if (props.year < 1886 || props.year > new Date().getFullYear()) {
            throw new Error('Année invalide');
        }

        if (props.kilometers < 0) {
            throw new Error('Le kilométrage ne peut pas être négatif');
        }

        if (props.price < 0) {
            throw new Error('Le prix ne peut pas être négatif');
        }
    }

    //Getters
    public getId(): string {
        return this.id;
    }

    public getBrand(): string {
        return this.brand;
    }

    public getModel(): string {
        return this.model;
    }

    public getYear(): number {
        return this.year;
    }

    public getStatus(): CarStatus {
        return this.status;
    }

    public getKilometers(): number {
        return this.kilometers;
    }

    public getPrice(): number {
        return this.price;
    }

    public getImages(): string[] {
        return [...this.images];
    }

    public getMotorisation(): Motorisation {
        return this.motorisation;
    }

    public getFuelType(): FuelType {
        return this.fuelType;
    }

    public getColor(): string {
        return this.color;
    }

    public getReference(): string {
        return this.reference;
    }

    public getAddedBy(): number | undefined {
        return this.addedBy;
    }

    public getUpdatedBy(): number | undefined {
        return this.updatedBy;
    }

    public getCreatedAt(): string | undefined {
        return this.createdAt;
    }

    public getUpdatedAt(): string | undefined {
        return this.updatedAt;
    }

    //Méthodes métiers
    public changeStatus(newStatus: CarStatus, userId: number): void {
        this.status = newStatus;
        this.setUpdated(userId);
    }

    public updatePrice(newPrice: number, userId: number): void {
        if (newPrice < 0) {
            throw new Error('Le prix ne peut pas être négatif');
        }
        this.price = newPrice;
        this.setUpdated(userId);
    }

    private setUpdated(userId: number): void {
        this.updatedBy = userId;
        this.updatedAt = new Date().toISOString();
    }
}
