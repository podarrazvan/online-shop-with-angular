import { Component, OnInit } from '@angular/core';
import { DbDeleteService } from 'src/app/shared/db-delete.service';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { DeleteAlertService } from 'src/app/shared/delete-alert/delete-alert.service';
import { Order } from 'src/app/shared/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private dbFetchDataService: DbFetchDataService,
    private dbDeleteService: DbDeleteService,
    private deleteAlertService: DeleteAlertService
  ) {}

  loading = true;

  canceled = 'canceled';
  New = 'new';
  processed = 'processed';

  showOrder = false;
  orderToShow: Order;

  orders: Order[];

  deleteAlert: boolean;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orders = [];
    this.dbFetchDataService.fetchOrders().subscribe((orders) => {
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
    this.deleteAlert = true;
    this.deleteAlertService.deleteMessage.subscribe((data) => {
      switch (data) {
        case true:
          this.dbDeleteService
            .deleteOrder(this.orders[index].key)
            .subscribe(() => {
              this.orders.splice(index, 1);
            });
          this.deleteAlert = false;
          break;
        case false:
          this.deleteAlert = false;
          break;
      }
    });
  }
}
