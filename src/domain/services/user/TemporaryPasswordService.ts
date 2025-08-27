export interface TemporaryPasswordService {
    generateTemporaryPassword(length: number): string;
}