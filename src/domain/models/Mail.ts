export class Mail {
    private readonly id: string;
    private subject: string;
    private body: string;
    private from: string;
    private to: string;

    constructor(id: string, subject: string, body: string, from: string, to: string) {
        this.id = id;
        this.subject = subject;
        this.body = body;
        this.from = from;
        this.to = to;
    }

    public getId(): string {
        return this.id;
    }

    public getSubject(): string {
        return this.subject;
    }

    public getBody(): string {
        return this.body;
    }

    public getFrom(): string {
        return this.from;
    }

    public getTo(): string {
        return this.to;
    }
}