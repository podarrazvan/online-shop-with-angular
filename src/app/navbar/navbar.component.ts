import { Component, HostListener, OnInit } from '@angular/core';
import { Category } from '../shared/category.interface';
import { DBService } from '../shared/db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private db: DBService) {}

  showCategories = false;
  wasInside: boolean;

  categories: Category[];

  ngOnInit(): void {
    this.categories = [];
    this.db.fetchCategories().subscribe((data) => {
      for (let category of data) {
        this.categories.push(category);
      }
    });
  }

  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.showCategories = false;
    }
    this.wasInside = false;
  }
}
