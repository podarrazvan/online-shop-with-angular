import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.interface';

@Injectable()

export class DbWebsiteEditService {
    constructor(
        private http: HttpClient
      ) { }
      categories: Category[];
      category;

      addToCarousel(key: string, category: string) {
        const user = JSON.parse(localStorage.getItem('userData'));
        const product = { id: key, category: category };
        this.http
          .post(
            `https://shop-436e8.firebaseio.com/homepage/carousel/.json?auth=${user._token}`,
            product,
            {
              observe: 'response',
            }
          )
          .subscribe(
            (responseData) => {
              console.log(responseData);
            },
            (error) => {
              console.log('error:', error);
              error.next(error.message);
            }
          );
      }
    
      addHomepageArea(name: string) {
        const user = JSON.parse(localStorage.getItem('userData'));
        const area = { name: name };
        this.http
          .post<{ name: string }>(
            `https://shop-436e8.firebaseio.com/homepage/areas/.json?auth=${user._token}`,
            area,
            {
              observe: 'response',
            }
          )
          .subscribe(
            (responseData) => {
              console.log(responseData);
            },
            (error) => {
              console.log('error:', error);
              error.next(error.message);
            }
          );
      }
    
      addCategory(name: string) {
        const user = JSON.parse(localStorage.getItem('userData'));
        const category = { name: name };
        this.http
          .post<{ name: string }>(
            `https://shop-436e8.firebaseio.com/categories/.json?auth=${user._token}`,
            category,
            {
              observe: 'response',
            }
          )
          .subscribe(
            (responseData) => {
              console.log(responseData);
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
      editTermsOfUse(termsOfUse: string) {
        const user = JSON.parse(localStorage.getItem('userData'));
        const terms = { termsOfUse: termsOfUse };
        this.http
          .put(`https://shop-436e8.firebaseio.com/terms-of-use/.json?auth=${user._token}`, terms, {
            observe: 'response',
          })
          .subscribe(
            (responseData) => {
              console.log(responseData);
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
    
      editAboutUs(aboutUs: string) {
        const user = JSON.parse(localStorage.getItem('userData'));
        const about = { aboutUs: aboutUs };
        this.http
          .put(`https://shop-436e8.firebaseio.com/about-us/.json?auth=${user._token}`, about, {
            observe: 'response',
          })
          .subscribe(
            (responseData) => {
              console.log(responseData);
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
    
      setName(name: string) {
        const user = JSON.parse(localStorage.getItem('userData'));
        const websiteName = { name: name };
        this.http
          .put(`https://shop-436e8.firebaseio.com/website-name/.json?auth=${user._token}`, websiteName, {
            observe: 'response',
          })
          .subscribe(
            (responseData) => {
              console.log(responseData);
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
}