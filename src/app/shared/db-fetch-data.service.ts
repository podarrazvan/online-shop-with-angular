import { Product } from './product.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from './category.interface';
import { HomepageArea } from './homepage-area.interface';
import { Message } from './message.interface';
import { Order } from './order.interface';

@Injectable()
export class DbFetchDataService {
    constructor(
        private http: HttpClient
      ) { }
    
      categories: Category[];
      category;
    
      fetchProductsByCategory(category) {
        const productsArray = [];
        return this.http
          .get<{ key: string }>(
            `https://shop-436e8.firebaseio.com/products/${category}/.json`
          )
          .pipe(
            map((responseData) => {
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  productsArray.push({ ...responseData[key], key });
                }
              }
              return productsArray;
            })
          );
      }
    
      fetchProduct(category: string, key: string) {
        return this.http.get<Product>(
          `https://shop-436e8.firebaseio.com/products/${category}/${key}.json`
        );
      }
    
      fetchHomepageAreas() {
        const homepageAreasArray: HomepageArea[] = [];
        return this.http
          .get<{ key: string }>(
            `https://shop-436e8.firebaseio.com/homepage/areas/.json`
          )
          .pipe(
            map((responseData) => {
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  homepageAreasArray.push({ ...responseData[key], key });
                }
              }
              return homepageAreasArray;
            })
          );
      }
    
      fetchCategories() {
        const categoriesArray = [];
        return this.http
          .get<{ key: string }>(
            `https://shop-436e8.firebaseio.com/categories/.json`
          )
          .pipe(
            map((responseData) => {
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  categoriesArray.push({ ...responseData[key], key });
                }
              }
              return categoriesArray;
            })
          );
      }
    
      fetchFromCarousel() {
        const carouselArray = [];
        return this.http
          .get<{ category: string; id: string; key: string }>(
            `https://shop-436e8.firebaseio.com/homepage/carousel/.json`
          )
          .pipe(
            map((responseData) => {
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  carouselArray.push({ ...responseData[key], key });
                }
              }
              return carouselArray;
            })
          );
      }
    
      fetchMessages() {
        const messagesArray = [];
        return this.http
          .get<{ message: Message }>(
            `https://shop-436e8.firebaseio.com/messages/.json`
          )
          .pipe(
            map((responseData) => {
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  messagesArray.push({ ...responseData[key], key });
                }
              }
              return messagesArray;
            })
          );
      }
    
      fetchTermsOfUse() {
        return this.http
          .get<{ termsOfUse: string }>(`https://shop-436e8.firebaseio.com/terms-of-use/.json`);
      }
    
      fetchAboutUs() {
        return this.http
          .get<{ aboutUs: string }>(`https://shop-436e8.firebaseio.com/about-us/.json`);
    
      }
    
      fetchName() {
        return this.http
          .get<{ name: string }>(`https://shop-436e8.firebaseio.com/website-name/.json`);
    
      }
    
      fetchOrders() {
        const user = JSON.parse(localStorage.getItem('userData'));
        const ordersArray = [];
        return this.http
          .get<{order: Order}>(`https://shop-436e8.firebaseio.com/orders/.json?auth=${user._token}`)    
          .pipe(
            map((responseData) => {
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  ordersArray.push({ ...responseData[key], key });
                }
              }
              return ordersArray;
            })
          );
    
      }
}