import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/category.interface';
import { DBService } from 'src/app/shared/db.service';
import { Product } from 'src/app/shared/product.interface';
import { HomepageEditAlertComponent } from './homepage-edit-alert/homepage-edit-alert.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  componentFactoryResolver: any;
  alertHost: any;
  closeSub: any;
  productToAddOnHomepage: Product;
  idOfProductToAddOnHomepage: string;

  constructor(private db: DBService) {}

  products: Product[];
  productsData;

  categories: Category[];
  category;

  showEditHomepage = false;
  showEditProduct = false;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories = [];
    this.db.fetchCategories().subscribe((categories) => {
      this.category = categories;
      for (let category of categories) {
        this.getProducts(category.name);
      }
    });
  }

  getProducts(cat: string) {
    this.products = [];
    this.db.fetchProductsByCategory(cat).subscribe((products) => {
      this.productsData = products;
      for (let productsData of products) {
        this.products.push(productsData);
      }
      return this.products;
    });
  }

  onDelete(category, key) {
    // To do: delete the photo too!
    this.db.deleteProduct(category, key).subscribe();
  }

  openEdit(type: string, product: Product) {
    type === 'homepage'
      ? (this.showEditHomepage = true)
      : (this.showEditProduct = true);
    this.productToAddOnHomepage = product;
  }

  close(type: string) {
    type === 'homepage'
      ? (this.showEditHomepage = false)
      : (this.showEditProduct = false);
  }
}
