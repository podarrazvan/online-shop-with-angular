import { Product } from './product.interface';

export interface Order {
    cart: any;
    adress: string,
    total: string,
    status?: string,
    date?: Date,
    key?: string
}