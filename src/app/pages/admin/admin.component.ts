import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements DoCheck {
  constructor(private activeRouter: ActivatedRoute) {}

  nothingSelected = true;

  ngDoCheck(): void {
    this.checkUrl();
  }

  checkUrl() {
    var _activeChild = this.activeRouter.children.length;
    if (_activeChild != 0) {
      this.nothingSelected = false;
    }
  }
}
