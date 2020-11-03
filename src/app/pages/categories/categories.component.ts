import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dbFetchDataService: DbFetchDataService) {}

  urlData: { category: string };

  isLoading = true;

  products: Product[];

  ngOnInit(): void {
    this.urlData = {
      category: this.route.snapshot.params['category'],
    };
    this.getProducts(this.urlData.category);
  }

  getProducts(category: string) {
    this.products = [];
    this.dbFetchDataService.fetchProductsByCategory(category).subscribe((response) => {
      for (let product of response) {
        this.products.push(product);
      }
      this.isLoading = false;
      console.log(this.products);
    });
  }
}
