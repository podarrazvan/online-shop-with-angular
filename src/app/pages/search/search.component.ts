import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/category.interface';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dbFetchDataService: DbFetchDataService) {}

  urlData: { search: string[] };

  products: Product[];
  productsData;
  categories: Category[];
  category;

  ngOnInit(): void {
    this.urlData = {
      search: this.route.snapshot.params['search'].split('-'),
    };

    this.searchResult(this.urlData.search);
  }

  searchResult(search: string[]) {
    this.categories = [];
    this.products = [];
    this.dbFetchDataService.fetchCategories().subscribe((categories) => {
      this.category = categories;
      for (let category of categories) {
        this.getProducts(category.name, search);
      }
    });
  }

  getProducts(cat: string, search: string[]) {
    this.dbFetchDataService.fetchProductsByCategory(cat).subscribe((products) => {
      for (let product of products) {
        for (let word of search) {
          if(word != '') {
            word = word.toLowerCase();
            product.title = product.title.toLowerCase();
            if (product.title.includes(word)) {
              this.products.push(product);
              break;
            }
            product.description = product.description.toLowerCase();
            if (product.description.includes(word)) {
              this.products.push(product);
              break;
            }
            for(let tag of product.tags){
              tag = tag.toLowerCase();
              if(tag === word){
                this.products.push(product);
                break
              }
            }
          }
        }
      }
      return this.products;
    });
  }
}
