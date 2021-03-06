import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, DoCheck {
  constructor(
    private dbFetchDataService: DbFetchDataService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  emptyCart: boolean;

  cart;
  showCart = false;
  total = 0;

  mobile: boolean;

  ngOnInit(): void {
    this.mobile = this.sharedDataService.mobile;
    this.cart = [];
    const products = JSON.parse(localStorage.getItem('cart'));
    products.length > 0 ? this.emptyCart  = false : this.emptyCart = true;
    for (let product of products) {
      const category = product.category;
      const key = product.product;
      const quantity = product.quantity;
      this.getProduct(category, key, quantity);
    }
    this.showCart = true;
  }
  // Use observable 
  ngDoCheck() {
    this.sharedDataService.totalCart = this.total;
    console.log(this.sharedDataService.totalCart);
  }

  getProduct(category: string, key: string, quantity: string) {
    this.dbFetchDataService.fetchProduct(category, key).subscribe((response) => {
      this.cart.push({ product: response, quantity: quantity, key: key });
      this.total += +response.price * +quantity;
    });
  }

  onDelete(index: number) {
    this.total -= this.cart[index].product.price * this.cart[index].quantity;
    this.cart.splice(index, 1);
    if(this.cart.length === 0){
      this.sharedDataService.updateCart(true);
      localStorage.removeItem("cart");
      this.router.navigate(['../'])
    }else{
      this.updateLocalstorage();
    }
  }

  increaseQuantity(index: number) {
    if (this.cart[index].quantity <= +this.cart[index].product.quantity) {
      this.cart[index].quantity++;
      this.total += +this.cart[index].product.price;
      this.updateLocalstorage();
    }
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity != 0) {
      this.cart[index].quantity--;
      this.total -= +this.cart[index].product.price;
      this.updateLocalstorage();
    }
  }

  updateLocalstorage() {
    let cartUpdated = [];
    for (let product of this.cart) {
      console.log(product);
      cartUpdated.push({
        category: product.product.category,
        product: product.key,
        quantity: product.quantity,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cartUpdated));
  }
}
