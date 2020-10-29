import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/category.interface';
import { DBService } from 'src/app/shared/db.service';
import { HomepageArea } from 'src/app/shared/homepage-area.interface';
import { Product } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db: DBService) {}
  
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
    this.db
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
    this.db
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
    this.db
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
    this.db.fetchFromCarousel().subscribe((data) => {
      for(let product of data){
        const category = product.category;
        const key = product.id;
        this.db.fetchProduct(category, key).subscribe(data => {
          // this.carouselImages.push(data.img)
          this.carousel.push({img: data.img, category: category,id: key});
        })
      }
      console.log(this.carousel);
      this.carousel.splice(0,1);
    });
  }

}
