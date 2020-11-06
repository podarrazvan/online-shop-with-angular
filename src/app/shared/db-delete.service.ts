import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';


@Injectable()
export class DbDeleteService {
  error: any;

  constructor(
    private http: HttpClient
  ) { }

  deleteProduct(category: string, key: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/products/${category}/${key}/.json?auth=${user._token}`
    );
  }

  deleteFromCarousel(key: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/homepage/carousel/${key}/.json?auth=${user._token}`
    );
  }

  deleteHomepageArea(key: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/homepage/areas/${key}/.json?auth=${user._token}`
    );
  }

  deleteCategory(key: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/categories/${key}/.json?auth=${user._token}`
    );
  }

  deleteMessage(key: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/messages/${key}/.json?auth=${user._token}`
    );
  }

  deleteOrder(key: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/orders/${key}/.json?auth=${user._token}`
    );
  }

  deletePhoto(img: string) {
    var image = firebase.storage().refFromURL(img);
    image
      .delete()
      .then(function () {
        console.log('Image deleted!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
