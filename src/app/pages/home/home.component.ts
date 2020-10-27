import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/category.interface';
import { DBService } from 'src/app/shared/db.service';
import { HomepageArea } from 'src/app/shared/homepage-area.interface';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db: DBService) {}

  columns = 4;
  columnsNr: number[];
  
  homepageAreas: HomepageArea[];
  area;
  
  // public product1 = this.db.product1;
  // public product2 = this.db.product2;
  // public product3 = this.db.product3;
  
  // public products = [this.product1, this.product2,this.product2, this.product2, this.product3];

  products: Product[] = [];
  productsData;
  categories: Category[];
  category;
  
  ngOnInit(): void {
    this.getAreas();
    this.getCategories();
  }

  getAreas() {
    this.homepageAreas = [];
    this.db
      .fetchHomepageAreas()
      .subscribe((areas) => {
        for (let area of areas) {
          this.homepageAreas.push(area);
        }
        return this.homepageAreas;
      });
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

}
