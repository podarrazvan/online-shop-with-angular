import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBService } from 'src/app/shared/db.service';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild('quantity') quantity: ElementRef;

  constructor(private route: ActivatedRoute,
    private db: DBService) { }

  urlData: { category: string, key: string };
  product;
  newCart: [{ product: Product }];
  images;
  isLoading = true;

  ngOnInit(): void {
    this.urlData = {
      category: this.route.snapshot.params['category'],
      key: this.route.snapshot.params['key']
    }
    this.getProduct(this.urlData.category, this.urlData.key)
  }

  getProduct(category: string, key: string) {
    this.images = []
    this.db.fetchProduct(category, key).subscribe((response) => {
      this.product = response;
      this.images.push(response.img);
      this.isLoading = false
    });
  }

  addToCart() {
    localStorage.setItem(JSON.stringify(localStorage.length), JSON.stringify({
      product: this.urlData.key,
      category: this.urlData.category,
      quantity: this.quantity.nativeElement.value
    }));
    alert('Added to cart!')
  }

}
