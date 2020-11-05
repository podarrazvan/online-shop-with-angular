import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements DoCheck, OnInit, OnDestroy {
  constructor(private activeRouter: ActivatedRoute) {}

  nothingSelected = true;

  ngOnInit(){
    const reloaded = JSON.parse(localStorage.getItem('reloaded'))
    if(!reloaded) {
      const darkMode  = JSON.parse(localStorage.getItem('darkMode'));
      localStorage.setItem('darkModeAdmin', JSON.stringify(darkMode));
      if(darkMode){
        localStorage.setItem('darkMode', JSON.stringify(false));
        localStorage.setItem('reloaded', JSON.stringify(true));
        location.reload();
      }
    }
  }

  ngDoCheck(): void {
    this.checkUrl();
  }

  checkUrl() {
    var _activeChild = this.activeRouter.children.length;
    if (_activeChild != 0) {
      this.nothingSelected = false;
    }
  }

  ngOnDestroy() {
    const darkMode  = JSON.parse(localStorage.getItem('darkModeAdmin'));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if(darkMode){
      location.reload();
    }
    localStorage.removeItem("darkModeAdmin");
    localStorage.removeItem("reloaded");
  }
}
