export enum Role {
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
    MANAGER = 'manager',
}

export class User {
    private active: boolean;

    constructor(
        private readonly id: string,
        private firstname: string,
        private lastname: string,
        private birthdate: Date,
        private role: Role,
        private email: string,
        private password: string,
        isActive: boolean = true
    ) {
        this.active = isActive;
    }

    getId(): string {
        return this.id;
    }
    getFirstname(): string {
        return this.firstname;
    }
    getLastname(): string {
        return this.lastname;
    }
    getBirthdate(): Date {
        return this.birthdate;
    }
    getRole(): Role {
        return this.role;
    }
    getEmail(): string {
        return this.email;
    }
    getPassword(): string {
        return this.password;
    }

    isAdmin(): boolean {
        return this.role === Role.ADMIN;
    }
    isEmployee(): boolean {
        return this.role === Role.EMPLOYEE;
    }
    isManager(): boolean {
        return this.role === Role.MANAGER;
    }

    isActive(): boolean {
        return this.active;
    }
}
