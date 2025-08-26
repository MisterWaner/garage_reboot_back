export interface UniqueUserIdService {
    generateUniqueId(firstname: string, lastname: string, birthdate: Date): Promise<string>;
}