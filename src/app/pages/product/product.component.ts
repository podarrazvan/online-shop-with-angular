import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBService } from 'src/app/shared/db.service';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild('quantity') quantity: ElementRef;

  constructor(private route: ActivatedRoute, private db: DBService) {}

  urlData: { category: string; key: string };
  product;
  newCart: [{ product?: string; category?: string; quantity?: string }] = [{}];
  images;
  isLoading = true;

  ngOnInit(): void {
    this.urlData = {
      category: this.route.snapshot.params['category'],
      key: this.route.snapshot.params['key'],
    };
    this.getProduct(this.urlData.category, this.urlData.key);
  }

  getProduct(category: string, key: string) {
    this.images = [];
    this.db.fetchProduct(category, key).subscribe((response) => {
      this.product = response;
      for (let img of response.img) {
        this.images.push(img);
      }
      console.log(this.images);
      this.isLoading = false;
    });
  }

  addToCart() {
    let alreadyIn = false;
    if (JSON.parse(localStorage.getItem('cart')) != null) {
      this.newCart = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.newCart.splice(0, 1);
    }
    for (let product of this.newCart) {
      if (product.product === this.urlData.key) {
        let quantity = +product.quantity;
        quantity++;
        product.quantity = quantity.toString();
        alreadyIn = true;
        break;
      }
    }
    if (!alreadyIn) {
      this.newCart.push({
        product: this.urlData.key,
        category: this.urlData.category,
        quantity: this.quantity.nativeElement.value,
      });
    }

    localStorage.setItem('cart', JSON.stringify(this.newCart));
    alert('Added to cart!');
  }
}
