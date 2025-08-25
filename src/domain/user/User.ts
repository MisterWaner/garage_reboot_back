export enum Role {
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
}

export class User {
    constructor(
        private readonly id: string,
        private firstname: string,
        private lastname: string,
        private birthdate: Date,
        private role: Role,
        private email: string,
        private password: string = 'azertyop123456'
    ) {}
    
    // Getters
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

    getEmail(): string | undefined {
        return this.email;
    }

    getPassword(): string | undefined {
        return this.password;
    }
}
