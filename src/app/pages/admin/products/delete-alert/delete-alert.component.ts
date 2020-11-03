import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbDeleteService } from 'src/app/shared/db-delete.service';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss'],
})
export class DeleteAlertComponent {
  constructor(private dbDeleteService: DbDeleteService,
              private dbFetchDataServide: DbFetchDataService) {}

  @Input() productToDelete: {
    category: string;
    key: string;
    index: string;
    img: string;
  };
  @Output() yes = new EventEmitter<void>();
  @Output() no = new EventEmitter<void>();

  yesBtn() {
    this.dbDeleteService
      .deleteProduct(this.productToDelete.category, this.productToDelete.key)
      .subscribe(() => {
        for (let img of this.productToDelete.img) {
          this.dbDeleteService.deletePhoto(img);
        }
      });
    this.dbFetchDataServide.fetchFromCarousel().subscribe((data) => {
      for (let product of data) {
        if (product.id === this.productToDelete.key) {
          this.dbDeleteService.deleteFromCarousel(product.key).subscribe();
        }
      }
    });
    this.yes.emit();
  }

  noBtn() {
    this.no.emit();
  }
}
