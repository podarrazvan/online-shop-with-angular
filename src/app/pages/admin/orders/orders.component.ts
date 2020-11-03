import { Component, DoCheck, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';
import { Order } from 'src/app/shared/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private db: DBService) { }

  loading = true;

  canceled = 'canceled';
  New = 'new';
  processed = 'processed';

  showOrder = false;
  orderToShow: Order;

  orders: Order[];

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orders = []
    this.db.fetchOrders().subscribe((orders) => {
      for (let order of orders) {
        this.orders.push(order);
      }
      this.loading = false;
      this.orders = this.orders.reverse();
    });
  }

  openOrder(order: Order) {
    this.orderToShow = order;
    this.showOrder = true;
  }

  closeOrder() {
    this.showOrder = false;
  }

  orderUpdated() {
    this.getOrders();
    this.showOrder = false;
  }

  onDelete(index: number) {
    this.db.deleteOrder(this.orders[index].key).subscribe(() => {
      this.orders.splice(index, 1);
    })
  }
}
