import { Product } from './product.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from './category.interface';
import { HomepageArea } from './homepage-area.interface';
import { ProductComponent } from '../pages/product/product.component';

@Injectable()

export class DBService {
  error: any;

  constructor(private afStorage: AngularFireStorage,
    private http: HttpClient) { }

    categories: Category[];
    category;
  
  public upload(event: any, filename: string): Promise<string> {
    return this.afStorage
      .upload(filename, event.target.files[0])
      .then(result => result.ref.getDownloadURL());
  }

  createAndStoreProduct(title: string, category: string, price: number, img: any, description: string, tags: any, quantity: number) {
    const productData: Product = { title: title, category: category, price: price, img: img, description: description, tags: tags, quantity: quantity };
    this.http
      .post<{ name: string }>(
        `https://shop-436e8.firebaseio.com/products/${category}/.json`,
        productData,
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
          // this.addLink(responseData.body.name, responseData.url, productData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  // addLink(name: string, productUrl, product: Product) {
  //   let newUrl = productUrl.split("");
  //   newUrl.splice(productUrl.length - 6, 0, "/" + name)
  //   newUrl = newUrl.join("");
  //   const newProduct: Product = { title: product.title, category: product.category, price: product.price, img: product.img, description: product.description, tags: product.tags, quantity: product.quantity};
  //   this.http
  //     .put(
  //       `https://shop-436e8.firebaseio.com/products/${product.category}/${name}/.json`,
  //       newProduct,
  //       {
  //         observe: 'response'
  //       }
  //     )
  //     .subscribe(
  //       responseData => {
  //         console.log(responseData);
  //       },
  //       error => {
  //         this.error.next(error.message);
  //       }
  //     );
  // }

  addHomepageAreaOnProduct(product: Product, homepagePosition: string) {
    console.log(homepagePosition);
    const newProduct: Product = { title: product.title, category: product.category, price: product.price, img: product.img, description: product.description, tags: product.tags, quantity: product.quantity, homepagePosition: homepagePosition };
    return this.http.put(`https://shop-436e8.firebaseio.com/products/${product.category}/${product.key}/.json`,
      newProduct,
      {
        observe: 'response'
      }
    )
  }

  addToCarousel(key:string, category: string) {
    const product = {id: key, category: category}
    this.http.post(`https://shop-436e8.firebaseio.com/homepage/carousel/.json`,
    product,
    {
      observe: 'response'
    }
    ).subscribe(
      responseData => {
        console.log(responseData);
      },
      error => {
        console.log('error:', error);
        error.next(error.message);
      }
    );
  }

  addHomepageArea(name: string) {
    const area = { name: name };
    this.http
      .post<{ name: string }>(
        `https://shop-436e8.firebaseio.com/homepage/areas/.json`,
        area,
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          console.log('error:', error);
          error.next(error.message);
        }
      );
  }

  // To do: add 

  // addProductToHomepageArea(key: string, product: string,category: string ) {
  //   const area = {name: name, product: product, category: category};
  //   this.http
  //     .post<{ name: string }>(
  //       `https://shop-436e8.firebaseio.com/homepage/areas/${key}.json`,
  //       area,
  //       {
  //         observe: 'response'
  //       }
  //     )
  //     .subscribe(
  //       responseData => {
  //         console.log(responseData);
  //       },
  //       error => {
  //         console.log('error:',error);
  //         error.next(error.message);
  //       }
  //     );
  // }

  addCategory(name: string) {
    const category = { name: name };
    this.http
      .post<{ name: string }>(
        `https://shop-436e8.firebaseio.com/categories/.json`,
        category,
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  fetchProductsByCategory(category) {
    const productsArray = [];
    return this.http.get<{ key: string }>(`https://shop-436e8.firebaseio.com/products/${category}/.json`)
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
    return this.http.get<Product>(`https://shop-436e8.firebaseio.com/products/${category}/${key}.json`);
  }

  fetchHomepageAreas() {
    const homepageAreasArray: HomepageArea[] =[];
    return this.http.get<{ key: string }>(`https://shop-436e8.firebaseio.com/homepage/areas/.json`).pipe(
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
    return this.http.get<{ key: string }>(`https://shop-436e8.firebaseio.com/categories/.json`).pipe(
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
    const carouselArray = []
    return this.http.get(`https://shop-436e8.firebaseio.com/homepage/carousel/.json`)
    .pipe(
      map((responseData) => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            carouselArray.push({ ...responseData[key]});
          }
        }
        // console.log("carouselArray",carouselArray)
        return carouselArray;
      })
    );
  }

  deleteProduct(category: string, key: string) {
    return this.http
      .delete(`https://shop-436e8.firebaseio.com/products/${category}/${key}/.json`);
  }

  deleteHomepageArea(key: string) {
    console.log(key)
    return this.http
      .delete(`https://shop-436e8.firebaseio.com/homepage/areas/${key}/.json`);
  }

  deleteCategory(key: string) {
    console.log(key)
    return this.http
      .delete(`https://shop-436e8.firebaseio.com/categories/${key}/.json`);
  }

  // fetchSinglePost(category, uid, name) {
  //   return this.http.get<{[key: string]:Post}>(`https://cure-with-photos-af2fa.firebaseio.com/posts/${category}/${uid}/${name}/.json`);
  // }


}
