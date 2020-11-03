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

  onSearch(search) {
    this.router.navigate(['../search', search.value.replace(/\s/g, '-')]);
  }
}
