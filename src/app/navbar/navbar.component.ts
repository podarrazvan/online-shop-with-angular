import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/category.interface';
import { DbFetchDataService } from '../shared/db-fetch-data.service';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private dbFetchDataService: DbFetchDataService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  adminPage = false;

  admin: boolean;

  name: string;

  showCategories = false;
  wasInside: boolean;

  categories: Category[];

  emptyCart: boolean;

  ngOnInit(): void {
    this.dbFetchDataService.fetchName().subscribe((name) => {
      this.name = name.name;
    });

    this.categories = [];
    this.dbFetchDataService.fetchCategories().subscribe((data) => {
      for (let category of data) {
        this.categories.push(category);
      }
    });
    this.sharedDataService.emptyCart.subscribe((status) => {
      this.emptyCart = status;
    });
    this.sharedDataService.isAuthenticated.subscribe((authStatus) => {
      this.admin = authStatus;
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

  darkMode() {
    let mode = JSON.parse(localStorage.getItem('darkMode'));
    localStorage.setItem('darkMode', JSON.stringify(!mode));
    location.reload();
  }

  onSearch(search) {
    this.router.navigate(['../search', search.value.replace(/\s/g, '-')]);
  }

  openAdmin() {
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));
    localStorage.setItem('darkModeAdmin', JSON.stringify(darkMode));
    if (darkMode) {
      localStorage.setItem('darkMode', JSON.stringify(false));
      localStorage.setItem('reloaded', JSON.stringify(true));
      window.location.replace(window.location.href + 'admin');
    } else {
      this.router.navigate(['../admin']);
    }
  }

  // Use observable
  ngDoCheck(): void {
    if (window.location.href.includes('/admin')) {
      this.adminPage = true;
    } else {
      this.adminPage = false;
    }
  }
}
