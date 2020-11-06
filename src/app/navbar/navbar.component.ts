import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/category.interface';
import { DbFetchDataService } from '../shared/db-fetch-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private dbFetchDataService: DbFetchDataService,
              private router: Router) {}

  adminPage = false;

  admin: boolean;

  name: string;

  showCategories = false;
  wasInside: boolean;

  categories: Category[];

  ngOnInit(): void {    
    this.dbFetchDataService.fetchName().subscribe(name => {
      this.name = name.name;
    })
    
    this.categories = [];
    this.dbFetchDataService.fetchCategories().subscribe((data) => {
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

  darkMode() {
    let mode = JSON.parse(localStorage.getItem('darkMode'));
    localStorage.setItem('darkMode', JSON.stringify(!mode));
    location.reload();
  }

  onSearch(search) {
    this.router.navigate(['../search', search.value.replace(/\s/g, '-')]);
  }

  openAdmin() {
      const darkMode  = JSON.parse(localStorage.getItem('darkMode'));
      localStorage.setItem('darkModeAdmin', JSON.stringify(darkMode));
      if(darkMode){
        localStorage.setItem('darkMode', JSON.stringify(false));
        localStorage.setItem('reloaded', JSON.stringify(true));
        window.location.replace(window.location.href + 'admin');
      } else {
        this.router.navigate(['../admin'])
      }
  }

  ngDoCheck(): void {
    const account = JSON.parse(localStorage.getItem('userData'));
     if(account != null){
      this.admin = true;
    } else {
      this.admin = false;
    }
    if(window.location.href.includes('/admin')){
      this.adminPage = true;
    }else {
      this.adminPage = false;
    }
  }
}
