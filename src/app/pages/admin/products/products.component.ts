import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/category.interface';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { Product } from 'src/app/shared/product.interface';
import { SharedDataService } from 'src/app/shared/shared-data.service';

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

  constructor(
    private dbFetchDataService: DbFetchDataService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  products: Product[];
  productsData;

  categories: Category[];
  category;

  showEditHomepage = false;
  showEditProduct = false;

  deleteAlert: boolean;
  productToDelete;
  productToDeleteIndex;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories = [];
    this.dbFetchDataService.fetchCategories().subscribe((categories) => {
      this.category = categories;
      for (let category of categories) {
        this.getProducts(category.name);
      }
    });
  }

  getProducts(cat: string) {
    this.products = [];
    this.dbFetchDataService.fetchProductsByCategory(cat).subscribe((products) => {
      this.productsData = products;
      for (let productsData of products) {
        this.products.push(productsData);
      }
      return this.products;
    });
  }

  onDelete(category, key, index, img) {
    this.deleteAlert = true;
    this.productToDeleteIndex = index;
    this.productToDelete = { category: category, key: key, img: img };
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

  openEditProduct(product: Product) {
    console.log(product);
    this.sharedDataService.product = product;
    this.sharedDataService.productEdit = true;
    this.router.navigate(['admin', 'add-product']);
  }

  onProductDeleted() {
    this.products.splice(this.productToDeleteIndex, 1);
    this.deleteAlert = false;
  }

  onCancelDelete() {
    this.deleteAlert = false;
  }
}
