import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/category.interface';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { DbStatisticsService } from 'src/app/shared/db-statistics.service';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  loading: boolean;

  showWebsite = false;

  showProducts = false;

  showOrders = false;

  continue = true;

  websiteStatistics: [
    {
      year?: number;
      month?: number;
      day?: number;
      views?: number;
    }
  ];

  productsStatistics;

  products: [{ product?: Product; views?: number }];
  productsData;
  categories: Category[];
  category;

  constructor(
    private dbStatisticsService: DbStatisticsService,
    private dbFetchDataService: DbFetchDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  websiteWiews() {
    this.websiteStatistics = [{}];
    this.websiteStatistics.splice(0, 1);
    const date = new Date();
    const startYear = +date.getFullYear();
    let startMonth = +date.getMonth();
    let startDay = +date.getDate();
    this.dbStatisticsService.getAllWebsiteViews().subscribe((responseData) => {
      for (let year = startYear; year > 2019; year--) {
        for (let month = startMonth; month > 0; month--) {
          for (let day = startDay; day > 0; day--) {
            try {
              responseData[year][month][day].views;
            } catch {
              break;
            }

            if (day === 0) {
              startDay = 31;
            }
            if (month === 0) {
              startMonth = 11;
            }
            const singleDay = {
              year: year,
              month: month + 1,
              day: day,
              views: responseData[year][month][day].views,
            };
            this.websiteStatistics.push(singleDay);
          }
        }
      }
      this.loading = false;
    });
  }

  statisticsWebsite() {
    this.loading = true;
    this.showWebsite = !this.showWebsite;
    this.showProducts = false;
    this.showOrders = false;
    this.websiteWiews();
  }

  statisticsProducts() {
    this.loading = true;
    this.showWebsite = false;
    this.showProducts = !this.showProducts;
    this.showOrders = false;
    this.getCategories();
  }

  statisticsOrders() {
    // this.loading = true;
    this.showWebsite = false;
    this.showProducts = false;
    this.showOrders = !this.showOrders;
  }

  getProducts(cat: string) {
    this.products = [{}];
    this.products.splice(0, 1);
    this.dbFetchDataService
      .fetchProductsByCategory(cat)
      .subscribe((products) => {
        for (let product of products) {
          this.dbStatisticsService
            .getProductViews(product.key)
            .subscribe((responseViews) => {
              this.products.push({
                product: product,
                views: responseViews.views,
              });
            });
        }
      });
    this.loading = false;
    console.log(this.products);
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

  openProduct(category: string, key: string) {
    this.router.navigate(['/product', category, key]);
  }
}
