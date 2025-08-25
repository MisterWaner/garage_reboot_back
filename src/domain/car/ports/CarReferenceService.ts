export interface CarReferenceService {
    generateUniqueReference(brand:string, model: string): Promise<string>;
}
