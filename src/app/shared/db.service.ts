import { Product } from './product.interface';

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
}
