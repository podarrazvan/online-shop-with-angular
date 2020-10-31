import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';
import { map } from 'rxjs/operators';
import { HomepageArea } from 'src/app/shared/homepage-area.interface';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.scss'],
})
export class WebsiteEditComponent implements OnInit {
  constructor(private db: DBService) {}

  homepageAreasHide = true;
  categoriesHide = true;

  homepageAreas: HomepageArea[];
  area;
  categories: string[];
  category;

  showEditTermsOfUse = false;

  showEditAboutUs = false;

  ngOnInit(): void {
    this.getAreas();
    this.getCategories();
  }

  addNewValue(value, type) {
    if (value.value != '' && type === 'area') {
      this.db.addHomepageArea(value.value);
      this.getAreas();
    }
    if (value.value != '' && type === 'category') {
      this.db.addCategory(value.value);
      this.getCategories();
    }
  }

  delete(index, id, type) {
    if (type === 'area') {
      this.db.deleteHomepageArea(id).subscribe(() => {
        this.homepageAreas.splice(index, 1);
        this.getAreas();
      });
    } else {
      this.db.deleteCategory(id).subscribe(() => {
        this.categories.splice(index, 1);
        this.getAreas();
      });
    }
  }

  getCategories() {
    this.categories = [];
    this.db
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
    this.db
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
}
