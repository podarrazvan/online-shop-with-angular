import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/category.interface';
import { DBService } from 'src/app/shared/db.service';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit{
  constructor(private db: DBService) {}

  index = 0;
  
  products: Product[] = [];
  productsData;
  categories: Category[];
  category;
  loading = true;

  ngOnInit() {
    this.getCategories();
  }

  getProducts(cat: string) {
    this.products = [];
    this.db
      .fetchProductsByCategory(cat)
      .subscribe((products) => {
        this.productsData = products;
        for (let productsData of products) {
          this.products.push(productsData);
        }
        this.loading = false;
        return this.products;
      });
  }
  
  getCategories() {
    this.categories = [];
    this.db
      .fetchCategories()
      .subscribe((categories) => {
        this.category = categories;
        for (let category of categories) {
          this.getProducts(category.name);
        }
      });
   }

  next() {
    this.index === this.products.length - 1 ? (this.index = 0) : this.index++;
  }

  previous() {
    this.index === 0 ? this.products.length - 1 : this.index--;
  }
}
