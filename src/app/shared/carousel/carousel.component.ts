import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() products: [{ img: string; category: string; id: string }];
  @Input() images: string[];
  @Input() homepage: boolean;
  @Input() productPage: boolean;

  constructor(private router: Router) {}

  index = 0;

  ngOnInit(): void {
    console.log('carusel', this.images);
  }

  onClick() {
    if (this.homepage === true) {
      this.router.navigate([
        '/product',
        this.products[this.index].category,
        this.products[this.index].id,
      ]);
    } else if (this.productPage === true) {
      // To do: img on full screen
    }
  }

  next() {
    this.index === this.products.length - 1 ? (this.index = 0) : this.index++;
  }

  previous() {
    this.index === 0 ? (this.index = this.products.length - 1) : this.index--;
  }
}
