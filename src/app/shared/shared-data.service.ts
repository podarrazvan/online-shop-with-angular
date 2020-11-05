import { Injectable, OnDestroy } from '@angular/core';
import { Product } from './product.interface';

@Injectable()
export class SharedDataService implements OnDestroy {
    productEdit: boolean;
    product: Product;
    unreadMessages: number;
    totalCart: number;

    ngOnDestroy() {
        this.productEdit = null;
        this.product = null;
        this.unreadMessages = null;
        this.totalCart = null;
    }
}