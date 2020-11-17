import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.interface';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.scss']
})
export class GetProductsComponent implements OnInit {

  @Input() img: string[];
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() homepagePosition: string;
  @Input() category: string;
  @Input() key: string;

  constructor(private router: Router) { }

  characters = 100;
  btnText = "Open product";

  ngOnInit(): void {
    if (window.innerWidth < 420) {
      this.characters = 20
      this.btnText = "Open";
    }

  }

  openProduct(c: string, k: string) {
    this.router.navigate(['/product', c, k]);
  }

}
