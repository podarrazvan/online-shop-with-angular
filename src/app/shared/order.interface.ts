export interface Order {
    name: string;
    email: string;
    adress: string;
    adress2?: string;
    city: string;
    state: string;
    zipCode: string;
    date: Date;
}