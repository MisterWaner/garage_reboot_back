export class Client {
    private readonly id: string;
    private fullname: string;
    private email: string;
    private phone: string;

    constructor(id: string, fullname: string, email: string, phone: string) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
    }

    public getId(): string {
        return this.id;
    }

    public getFullname(): string {
        return this.fullname;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhone(): string {
        return this.phone;
    }
}
