import { Product } from './product.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class DBService {
  private model3Img = `https://tesla-cdn.thron.com/delivery/public/image/tesla/088d64b2-afcc-43c6-9fa1-8f37e567a3d0/bvlatuR/std/2880x2400/desktop_model_3_v2`;
  private modelsImg =
    'https://www.tesla.com/sites/default/files/modelsx-new/ms-rhd-eu-en/hero/RHD_model-s_hero%402x.jpg';
  private modelxImg =
    'https://www.tesla.com/sites/default/files/images/blogs/model-x-blog.jpg';
  
  private description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc odio. Suspendisse potenti. Cras luctus, massa ut maximus egestas, lacus sapien euismod eros, sed posuere velit arcu eget eros. Praesent hendrerit metus vel nisl ultrices cursus. Nulla in dui massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed dapibus volutpat tempor. Duis rutrum purus vel ultricies auctor."

  public product1 = {
    title: 'Tesla Model 3',
    img: this.model3Img,
    price: 60000,
    description: this.description,
    url: 'not-found',
    homepagePosition: 'top'
  };

  public product2 = {
    title: 'Tesla model S',
    img: this.modelsImg,
    price: 60000,
    description: this.description,
    url: 'not-found',
    homepagePosition: 'top'
  };

  public product3 = {
    title: 'Tesla model X',
    img: this.modelxImg,
    price: 60000,
    description: this.description,
    url: 'not-found',
    homepagePosition: 'top'
  };
  error: any;
  
  constructor(private afStorage: AngularFireStorage, 
    private http: HttpClient){}
    
    
  public upload(event: any, filename: string): Promise<string> {
    return this.afStorage
      .upload(filename, event.target.files[0])
      .then(result => result.ref.getDownloadURL());
  }

  createAndStoreProduct(title: string, category: string, price: number, img: any, description: string, tags: any) {
    const productData: Product = {title:title,category: category, price: price, img: img, description: description, tags: tags};
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
          this.addLink(responseData.body.name,responseData.url,productData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }
  addLink(name: string,productUrl, product: Product) {
    let newUrl = productUrl.split(""); 
    newUrl.splice(productUrl.length-6,0,"/"+name)
    newUrl = newUrl.join("");
    const newProduct: Product = {title:product.title,category: product.category, price: product.price, img: product.img, description: product.description, tags: product.tags,url: newUrl};
    this.http
    .put(
      `https://shop-436e8.firebaseio.com/products/${product.category}/${name}/.json`,
        newProduct,
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

  // fetchPosts(users, category) {
  //   return this.http.get<{[key: string]:Post}>(`https://cure-with-photos-af2fa.firebaseio.com/posts/${category}/${users}/.json`);
  // }

  // fetchSinglePost(category, uid, name) {
  //   return this.http.get<{[key: string]:Post}>(`https://cure-with-photos-af2fa.firebaseio.com/posts/${category}/${uid}/${name}/.json`);
  // }


}
