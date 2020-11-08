import { Component, OnInit } from '@angular/core';
import { DbDeleteService } from 'src/app/shared/db-delete.service';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { DbWebsiteEditService } from 'src/app/shared/db-website-edit.sevice';
import { HomepageArea } from 'src/app/shared/homepage-area.interface';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.scss'],
})
export class WebsiteEditComponent implements OnInit {
  constructor(private dbWebsiteEditService: DbWebsiteEditService, 
              private dbDeleteService: DbDeleteService,
              private dbFetchDataService: DbFetchDataService) {}

  homepageAreasHide = true;
  categoriesHide = true;

  homepageAreas: HomepageArea[];
  area;
  categories: string[];
  category;

  showEditTermsOfUse = false;

  showEditAboutUs = false;

  showEditFooter = false;

  ngOnInit(): void {
    this.getAreas();
    this.getCategories();
  }

  addNewValue(value, type) {
    if (value.value != '' && type === 'area') {
      this.dbWebsiteEditService.addHomepageArea(value.value);
      this.getAreas();
    }
    if (value.value != '' && type === 'category') {
      this.dbWebsiteEditService.addCategory(value.value);
      this.getCategories();
    }
  }

  delete(index, id, type) {
    if (type === 'area') {
      this.dbDeleteService.deleteHomepageArea(id).subscribe(() => {
        this.homepageAreas.splice(index, 1);
        this.getAreas();
      });
    } else {
      this.dbDeleteService.deleteCategory(id).subscribe(() => {
        this.categories.splice(index, 1);
        this.getAreas();
      });
    }
  }

  getCategories() {
    this.categories = [];
    this.dbFetchDataService
      .fetchCategories()
      .subscribe((categories) => {
        this.category = categories;
        for (let category of categories) {
          this.categories.push(category);
        }
        return this.categories;
      });
  }

  getAreas() {
    this.homepageAreas = [];
    this.dbFetchDataService
      .fetchHomepageAreas()
      .subscribe((areas) => {
        this.area = areas;
        for (let area of areas) {
          this.homepageAreas.push(area);
        }
        return this.homepageAreas;
      });
  }

  editTermsOfUse() {
    this.showEditTermsOfUse = true;
  }

  closeTermsOfUseEdit() {
    this.showEditTermsOfUse = false;
  }

  editAboutUs() {
    this.showEditAboutUs = true;
  }

  closeEditAboutUs() {
    this.showEditAboutUs = false;
  }

  setName(name) {
    this.dbWebsiteEditService.setName(name.value);
  }
}
