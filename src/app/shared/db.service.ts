import { Product } from './product.interface';

export class DBService {
  private model3Img = `https://tesla-cdn.thron.com/delivery/public/image/tesla/088d64b2-afcc-43c6-9fa1-8f37e567a3d0/bvlatuR/std/2880x2400/desktop_model_3_v2`;
  private modelsImg =
    'https://www.tesla.com/sites/default/files/modelsx-new/ms-rhd-eu-en/hero/RHD_model-s_hero%402x.jpg';
  private modelxImg =
    'https://www.tesla.com/sites/default/files/images/blogs/model-x-blog.jpg';

  public product1 = {
    title: 'Tesla Model 3',
    img: this.model3Img,
  };

  public product2 = {
    title: 'Tesla model S',
    img: this.modelsImg,
  };

  public product3 = {
    title: 'Tesla model X',
    img: this.modelxImg,
  };
}
