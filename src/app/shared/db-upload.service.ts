import { Product } from './product.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.interface';
import { Order } from './order.interface';

@Injectable()
export class DbUploadService {
  constructor(
    private afStorage: AngularFireStorage,
    private http: HttpClient
  ) {}
 
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
          console.log(error.message);
        }
      );
  }

  updateProduct(product: Product, homepagePosition: string, key?: string) {
    if(key == undefined) {
      key = product.key;
    }
    const user = JSON.parse(localStorage.getItem('userData'));
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
      date: date,
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
      date: order.date,
    };
    return this.http.put(
      `https://shop-436e8.firebaseio.com/orders/${id}.json?auth=${user._token}`,
      orderToUpdate,
      {
        observe: 'response',
      }
    );
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
}
