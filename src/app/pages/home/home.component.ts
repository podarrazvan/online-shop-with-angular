import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db: DBService) {}
  
  columns = 4;
  columnsNr: number[];

  public product1 = this.db.product1;
  public product2 = this.db.product2;
  public product3 = this.db.product3;

  public products = [this.product1, this.product2,this.product2, this.product2, this.product3];

  ngOnInit(): void {
    this.columnsNr = Array(this.columns).fill(0)
  }

}
