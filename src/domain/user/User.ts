import crypto from 'crypto';

export enum Role {
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
}

export class User {
    private static idCounter = 1;
    private email: string;
    private password: string;
    private readonly id: number

    constructor(
        private firstname: string,
        private lastname: string,
        private role: Role
    ) {
        this.id = User.idCounter++;
        this.email = this.generateEmail(firstname, lastname);
        this.password = this.generateTemporaryPassword();
    }

    // Methods
    private generateEmail(firstname: string, lastname: string): string {
        const domain = 'garage-vincent-parrot.com';
        const cleanFirst = firstname.trim().toLowerCase().replace(/\s+/g, '.');
        const cleanLast = lastname.trim().toLowerCase().replace(/\s+/g, '.');
        return `${cleanFirst}.${cleanLast}@${domain}`;
    }

    private generateTemporaryPassword(length = 20): string {
        return crypto.randomBytes(length).toString('hex').slice(0, length);
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getFirstname(): string {
        return this.firstname;
    }

    getLastname(): string {
        return this.lastname;
    }

    getRole(): Role {
        return this.role;
    }

    getEmail(): string | undefined {
        return this.email;
    }

    getPassword(): string | undefined {
        return this.password;
    }
}
