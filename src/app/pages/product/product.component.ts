import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBService } from 'src/app/shared/db.service';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private db: DBService) { }

  urlData: {category: string, key: string};
  product;
  
  ngOnInit(): void {
    this.urlData= {
      category: this.route.snapshot.params['category'],
      key: this.route.snapshot.params['key']
    }
    this.getProduct(this.urlData.category,this.urlData.key)
  }

  getProduct( category: string, key: string) {
    this.db.fetchProduct(category,key).subscribe((response) => {
      this.product = response;
     });
   }

}
