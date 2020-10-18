import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  public model3 = `https://tesla-cdn.thron.com/delivery/public/image/tesla/088d64b2-afcc-43c6-9fa1-8f37e567a3d0/bvlatuR/std/2880x2400/desktop_model_3_v2`;
  public models = 'https://www.tesla.com/sites/default/files/modelsx-new/ms-rhd-eu-en/hero/RHD_model-s_hero%402x.jpg';
  private modelx ='https://www.tesla.com/sites/default/files/images/blogs/model-x-blog.jpg';
  public images = [this.model3,this.models,this.modelx];
}
