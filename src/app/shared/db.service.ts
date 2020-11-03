import { Product } from './product.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from './category.interface';
import { HomepageArea } from './homepage-area.interface';
import * as firebase from 'firebase';
import { Message } from './message.interface';
import { Order } from './order.interface';

@Injectable()
export class DBService {
  error: any;

  constructor(
    private afStorage: AngularFireStorage,
    private http: HttpClient
  ) { }

  categories: Category[];
  category;

  public upload(event: any, filename: string): Promise<string> {
    return this.afStorage
      .upload(filename, event.target.files[0])
      .then((result) => result.ref.getDownloadURL());
  }

  createAndStoreProduct(

    title: string,
    category: string,
    price: number,
    img: any,
    description: string,
    tags: any,
    quantity: number
  ) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const productData: Product = {
      title: title,
      category: category,
      price: price,
      img: img,
      description: description,
      tags: tags,
      quantity: quantity,
    };
    this.http
      .post<{ name: string }>(
        `https://shop-436e8.firebaseio.com/products/${category}/.json?auth=${user._token}`,
        productData,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  updateProduct(product: Product, homepagePosition: string, key: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log(product);
    const productData: Product = {
      title: product.title,
      category: product.category,
      price: product.price,
      img: product.img,
      description: product.description,
      tags: product.tags,
      quantity: product.quantity,
      homepagePosition: homepagePosition,
    };
    return this.http.put(
      `https://shop-436e8.firebaseio.com/products/${product.category}/${key}/.json?auth=${user._token}`,
      productData,
      {
        observe: 'response',
      }
    );
  }

  addHomepageAreaOnProduct(product: Product, homepagePosition: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const newProduct: Product = {
      title: product.title,
      category: product.category,
      price: product.price,
      img: product.img,
      description: product.description,
      tags: product.tags,
      quantity: product.quantity,
      homepagePosition: homepagePosition,
    };
    return this.http.put(
      `https://shop-436e8.firebaseio.com/products/${product.category}/${product.key}/.json?auth=${user._token}`,
      newProduct,
      {
        observe: 'response',
      }
    );
  }

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
          this.error.next(error.message);
        }
      );
  }

  addMessage(message: Message) {
    const date = new Date();
    const messageToAdd = {
      firstName: message.firstName,
      lastName: message.lastName,
      email: message.email,
      message: message.message,
      date: date,
      seen: false,
    };
    this.http
      .post(`https://shop-436e8.firebaseio.com/messages/.json`, messageToAdd, {
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

  addOrder(order: Order) {
    const date = new Date();
    const orderToAdd = {
      cart: order.cart,
      adress: order.adress,
      total: order.total,
      status: 'new',
      date: date
    };
    this.http
      .post(`https://shop-436e8.firebaseio.com/orders/.json`, orderToAdd, {
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

  updateOrder(order: Order, status: string, id: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const orderToUpdate = {
      cart: order.cart,
      adress: order.adress,
      total: order.total,
      status: status,
      date: order.date
    };
    return this.http
      .put(`https://shop-436e8.firebaseio.com/orders/${id}.json?auth=${user._token}`, orderToUpdate, {
        observe: 'response',
      })
  }

  updateMessage(message: Message) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const messageToAdd = {
      firstName: message.firstName,
      lastName: message.lastName,
      email: message.email,
      message: message.message,
      date: message.date,
      seen: true,
    };
    this.http
      .put(
        `https://shop-436e8.firebaseio.com/messages/${message.key}/.json?auth=${user._token}`,
        messageToAdd,
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
      );;

  }

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
