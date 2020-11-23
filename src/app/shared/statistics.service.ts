import { Injectable } from '@angular/core';
import { DbStatisticsService } from './db-statistics.service';
import { DbUploadService } from './db-upload.service';

@Injectable()
export class StatisticsService {
  constructor(private dbStatisticsService: DbStatisticsService) { }

  statistics;

  websiteUniqueView() {
    if (localStorage.getItem('statistics')) {
      const statistics = JSON.parse(localStorage.getItem('statistics'));
      if (!this.isToday(statistics.lastVisit)) {
        const date = new Date();
        const newStatistics = {
          lastVisit: {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
          },
          products: statistics.products,
        };
        localStorage.setItem('statistics', JSON.stringify(newStatistics));
        console.log(1);
        this.dbStatisticsService.websiteViews();
      }
    } else {
      const date = new Date();
      const statistics = {
        lastVisit: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        },
        products: [],
      };
      localStorage.setItem('statistics', JSON.stringify(statistics));
    }
  }

  isToday(lastVisit) {
    const today = new Date();
    return (
      lastVisit.year == today.getFullYear() &&
      lastVisit.month == today.getMonth() &&
      lastVisit.day == today.getDate()
    );
  }

  productUniqueView(category, key) {
    this.statistics = JSON.parse(localStorage.getItem('statistics'));
    if (this.statistics.products.length === 0) {
      this.addViewToProduct(category, key);
    } else {
      if (!this.statistics.products.includes(key)) {
        console.log('nu e de aici');
        this.addViewToProduct(category, key);
      }
    }
  }

  addViewToProduct(category, key) {
    this.statistics.products.push(key);
    localStorage.setItem('statistics', JSON.stringify(this.statistics));
    this.dbStatisticsService.getProductViews(key).subscribe((responseData) => {
      if (responseData == null) {
        this.dbStatisticsService.addProductViews(key, category, 1);
      } else {
        this.dbStatisticsService.addProductViews(
          key,
          category,
          +responseData.views + 1
        );
      }
    });
  }
}
