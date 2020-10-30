import { Injectable } from '@angular/core';
import { Product } from './product.interface';

@Injectable()
export class SharedDataService {
    productEdit: boolean;
    product: Product;
    unreadMessages: number;
}