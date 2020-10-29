import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { DBService } from 'src/app/shared/db.service';
import { HomepageArea } from 'src/app/shared/homepage-area.interface';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-homepage-edit-alert',
  templateUrl: './homepage-edit-alert.component.html',
  styleUrls: ['./homepage-edit-alert.component.scss']
})
export class HomepageEditAlertComponent implements OnInit{

  constructor(private db: DBService){}

  @Input() product: Product;
  @Output() close = new EventEmitter<void>();

  homepageAreas: HomepageArea[];
  area;

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
    this.getAreas();
  }

  getAreas() {
    this.homepageAreas = [];
    this.db
      .fetchHomepageAreas()
      .subscribe((areas) => {
        for (let area of areas) {
          this.homepageAreas.push(area);
        }
        return this.homepageAreas;
      });
    }
    onAdd(selectedArea) {
      if(selectedArea.value === 'carousel'){
        this.db.addToCarousel(this.product.key, this.product.category);
      } else {
        this.db.addHomepageAreaOnProduct(this.product, selectedArea.value) .subscribe(
          responseData => {
            console.log(responseData);
          },
          error => {
            console.log('error:',error);
          }
        );
      }
      this.close.emit();
      }
}
