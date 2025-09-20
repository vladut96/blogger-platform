export declare class EmailConfirmation {
    confirmationCode: string | null;
    expirationDate: Date | null;
    isConfirmed: boolean;
    constructor(data: {
        confirmationCode: string | null;
        expirationDate: Date | null;
        isConfirmed: boolean;
    });
}
export declare class EmailConfirmationFactory {
    static create(): EmailConfirmation;
    static createDefault(): EmailConfirmation;
}
