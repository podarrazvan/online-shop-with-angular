import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from 'src/app/shared/db.service';
import { Order } from 'src/app/shared/order.interface';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;

  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  constructor(private db: DBService,
              private router: Router) { }

  loading = true;
  
  products: [{quantity?:number, name?: string, total?: number, category?: string, id?: string}] = [{}]

  ngOnInit(): void {
    this.products.splice(0,1);
    for(let product of this.order.cart) {
      this.db.fetchProduct(product.category, product.product).subscribe(data => {
        const total = data.price * product.quantity;
        this.products.push({
          quantity: product.quantity,
          name: data.title,
          total: total,
          category: product.category,
          id: product.product
        });
      });
    }
    this.loading = false;
    console.log(this.products);
  }

  openProduct(category, id) {
    this.router.navigate(['/product',category, id]);
  }

  exit() {
   
  }

  updateOrder(status: string) {
    if(status != ''){
      this.db.updateOrder(this.order, status, this.order.key).subscribe(()=> this.updated.emit());
     
    } else {
      this.close.emit();
    }

    if(status === 'canceled' ){
      alert('Please don\'t forget to refund the money!')
    }
  }

}
