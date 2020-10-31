import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss'],
})
export class DeleteAlertComponent {
  constructor(private db: DBService) {}

  @Input() productToDelete: {
    category: string;
    key: string;
    index: string;
    img: string;
  };
  @Output() yes = new EventEmitter<void>();
  @Output() no = new EventEmitter<void>();

  yesBtn() {
    this.db
      .deleteProduct(this.productToDelete.category, this.productToDelete.key)
      .subscribe(() => {
        for (let img of this.productToDelete.img) {
          this.db.deletePhoto(img);
        }
      });
    this.db.fetchFromCarousel().subscribe((data) => {
      for (let product of data) {
        if (product.id === this.productToDelete.key) {
          this.db.deleteFromCarousel(product.key).subscribe();
        }
      }
    });
    this.yes.emit();
  }

  noBtn() {
    this.no.emit();
  }
}
