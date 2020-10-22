import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.scss']
})
export class GetProductsComponent implements OnInit {

  @Input() img: string;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() homepagePosition: string;
  @Input() url: string;

  constructor(private router: Router) { }
  
  

  ngOnInit(): void {
    
  }
  
  openProduct(url: string) {
    this.router.navigate([url]);
  }

}
