import { Component } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  constructor(private db: DBService) {}

  index = 0;

  public product1 = this.db.product1;
  public product2 = this.db.product2;
  public product3 = this.db.product3;

  public products = [this.product1, this.product2, this.product3];

  next() {
    this.index === this.products.length - 1 ? (this.index = 0) : this.index++;
  }

  previous() {
    this.index === 0 ? this.products.length - 1 : this.index--;
  }
}
