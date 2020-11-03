import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/category.interface';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { HomepageArea } from 'src/app/shared/homepage-area.interface';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dbFetchDataService: DbFetchDataService) {}
  
  carousel:[{img: string, category: string, id: string}];
  

  loading = true;

  homepageAreas: HomepageArea[];
  
  products: [{area:HomepageArea, product: Product[]}];
  productsData;
  categories: Category[];
  category;
  
  ngOnInit(): void {
    this.getAreas();
    this.createCarousel();
  }

  getAreas() {
    this.homepageAreas = [];
    this.dbFetchDataService
      .fetchHomepageAreas()
      .subscribe((areas) => {
        for (let area of areas) {
          this.homepageAreas.push(area);
        }
        this.getCategories();
        return this.homepageAreas;
      });
  }
  
  getProducts(cat: string) {
    this.products = [{area:{name:'', key:''},product:[]}];
    this.dbFetchDataService
      .fetchProductsByCategory(cat)
      .subscribe((products) => {
        for(let area of this.homepageAreas){
          const homepageArea = area
          const product =  products.filter(prod => prod.homepagePosition === area.name);
          this.products.push({area: homepageArea,product: product});
        }

        // !!!!! \\
        this.products.splice(0,1);
        // !!!!! \\
        
        this.loading = false;
        return this.products;
      });
  }
  
  getCategories() {
    this.categories = [];
    this.dbFetchDataService
      .fetchCategories()
      .subscribe((categories) => {
        this.category = categories;
        for (let category of categories) {
          this.getProducts(category.name);
        }
      });
  }

  createCarousel() {
    this.carousel = [{img:'',category:'',id:''}]
    this.dbFetchDataService.fetchFromCarousel().subscribe((data) => {
      for(let product of data){
        const category = product.category;
        const key = product.id;
        this.dbFetchDataService.fetchProduct(category, key).subscribe(data => {
          // this.carouselImages.push(data.img)
          this.carousel.push({img: data.img, category: category,id: key});
        })
      }
      console.log(this.carousel);
      this.carousel.splice(0,1);
    });
  }

}
