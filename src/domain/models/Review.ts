import { Client } from "./Client.js";

export enum ReviewStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

export class Review {
    private readonly id: string;
    private title: string;
    private comment: string;
    private rating: number;
    private status: ReviewStatus;
    private writtenBy: Client;
    private published: boolean;

    constructor(id: string, title: string, comment: string, rating: number, status: ReviewStatus, writtenBy: Client) {
        this.id = id;
        this.title = title;
        this.comment = comment;
        this.rating = rating;
        this.status = status;
        this.writtenBy = writtenBy;
        this.published = false;
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getComment(): string {
        return this.comment;
    }

    public getRating(): number {
        return this.rating;
    }

    public getStatus(): ReviewStatus {
        return this.status;
    }

    public getWrittenBy(): Client {
        return this.writtenBy;
    }

    public isPublished(): boolean {
        return this.published;
    }

    public publish(): void {
        this.published = true;
    }
}