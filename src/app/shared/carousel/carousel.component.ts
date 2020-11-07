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

  length: number;

  ngOnInit(): void {
    this.homepage
      ? (this.length = this.products.length)
      : (this.length = this.images.length);
  }

  onClick() {
    if (this.homepage) {
      this.router.navigate([
        '/product',
        this.products[this.index].category,
        this.products[this.index].id,
      ]);
    } else if (this.productPage) {
      // To do: img on full screen
    }
  }

  next() {
    this.index === this.length - 1 ? (this.index = 0) : this.index++;
    console.log(this.index);
  }

  previous() {
    console.log(this.index);
    this.index === 0 ? (this.index = this.length - 1) : this.index--;
  }
}
