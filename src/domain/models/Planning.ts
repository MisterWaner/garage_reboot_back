export class Planning {
    private readonly id: number;
    private slot: {
        day: string;
        openingHour: string;
        closingHour: string;
    };

    constructor(
        id: number,
        slot: { day: string; openingHour: string; closingHour: string }
    ) {
        this.id = id;
        this.slot = slot;
    }

    getId(): number {
        return this.id;
    }

    getSlot(): { day: string; openingHour: string; closingHour: string } {
        return this.slot;
    }
}
