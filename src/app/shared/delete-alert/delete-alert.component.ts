import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeleteAlertService } from './delete-alert.service';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss'],
})
export class DeleteAlertComponent implements OnInit, OnDestroy {
  constructor(private deleteAlertService: DeleteAlertService) {}

  @Input() itemToDelete: string;

  item: string;

  ngOnInit() {
    this.item = this.itemToDelete;
  }

  actionBtn(action: boolean) {
    switch (this.itemToDelete) {
      case 'product':
        this.deleteAlertService.deleteAlertProduct(action);
        break;
      case 'message':
        this.deleteAlertService.deleteAlertMessage(action);
        break;
      case 'order':
        this.deleteAlertService.deleteAlertMessage(action);
        break;
    }
  }
  ngOnDestroy(): void {
    this.deleteAlertService.deleteAlertProduct(null);
    this.deleteAlertService.deleteAlertMessage(null);
  }
}
