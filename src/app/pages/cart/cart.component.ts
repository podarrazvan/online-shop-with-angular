import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private db: DBService) {}
  cart;
  showCart = false;
  total = 0;

  ngOnInit(): void {
    this.cart = [];
    for (let i = 0; i < localStorage.length; i++) {
      const category = JSON.parse(localStorage.getItem(i.toString())).category;
      const key = JSON.parse(localStorage.getItem(i.toString())).product;
      const quantity = JSON.parse(localStorage.getItem(i.toString())).quantity;
      this.getProduct(category, key, quantity);
    }
    this.showCart = true;
  }

  getProduct(category: string, key: string, quantity: string) {
    this.db.fetchProduct(category, key).subscribe((response) => {
      this.cart.push({ product: response, quantity: quantity, key: key });
      this.total += +response.price * +quantity;
    });
  }

  onDelete(index: number) {
    this.total -= this.cart[index].product.price * this.cart[index].quantity;
    this.cart.splice(index, 1);
    this.updateLocalstorage();
  }

  increaseQuantity(index: number) {
    if (this.cart[index].quantity <= +this.cart[index].product.quantity) {
      this.cart[index].quantity++;
      this.total += +this.cart[index].product.price;
    }
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity != 0) {
      this.cart[index].quantity--;
      this.total -= +this.cart[index].product.price;
    }
  }

  updateLocalstorage() {
    localStorage.clear();
    for (let i = 0; i < this.cart.length; i++) {
      localStorage.setItem(
        i.toString(),
        JSON.stringify({
          product: this.cart[i].key,
          category: this.cart[i].product.category,
          quantity: this.cart[i].quantity,
        })
      );
    }
  }
}
