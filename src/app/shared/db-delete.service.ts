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
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/products/${category}/${key}/.json`
    );
  }

  deleteFromCarousel(key: string) {
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/homepage/carousel/${key}/.json`
    );
  }

  deleteHomepageArea(key: string) {
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/homepage/areas/${key}/.json`
    );
  }

  deleteCategory(key: string) {
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/categories/${key}/.json`
    );
  }

  deleteMessage(key: string) {
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/messages/${key}/.json`
    );
  }

  deleteOrder(key: string) {
    return this.http.delete(
      `https://shop-436e8.firebaseio.com/orders/${key}/.json`
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
