import { Injectable, OnDestroy } from '@angular/core';
import { Product } from './product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService implements OnDestroy {
  emptyCart = new BehaviorSubject<boolean>(true);
  isAuthenticated = new BehaviorSubject<boolean>(false);

  cast = this.emptyCart.asObservable();
  // cast = this.isAuthenticated.asObservable();

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

  updateCart(newStatus) {
    this.emptyCart.next(newStatus);
  }
  
  updateAuth(newStatus) {
    this.isAuthenticated.next(newStatus);
  }
}
