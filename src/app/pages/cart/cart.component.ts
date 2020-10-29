import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private db: DBService) { }
  cart;
  showCart = false;

  ngOnInit(): void {
    this.cart = []
    for(let i = 0; i < localStorage.length; i++){
      const category = JSON.parse(localStorage.getItem(i.toString())).category;
      const key = JSON.parse(localStorage.getItem(i.toString())).product;
      const quantity = JSON.parse(localStorage.getItem(i.toString())).quantity;
      this.getProduct(category, key, quantity);
    }
    this.showCart = true;

  }

  getProduct(category: string, key: string, quantity: string) {
    this.db.fetchProduct(category,key).subscribe((response) => {
      this.cart.push({product: response, quantity: quantity});
    });
  }


}
