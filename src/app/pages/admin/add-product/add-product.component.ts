import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DBService } from 'src/app/shared/db.service';
import { Product } from 'src/app/shared/product.interface';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private db: DBService,
    private sharedData: SharedDataService
  ) {}

  productForm: FormGroup;

  tags: string[] = [];
  images: string[] = [];

  products = [];
  categories: string[];
  category;

  ngOnInit(): void {
    if (this.sharedData.productEdit) {
      this.productForm = this.fb.group({
        title: [this.sharedData.product.title, Validators.required],
        category: [this.sharedData.product.category, Validators.required],
        price: [this.sharedData.product.price, Validators.required],
        img: '',
        description: [this.sharedData.product.description, Validators.required],
        tags: [this.sharedData.product.tags],
        quantity: [this.sharedData.product.quantity, Validators.required],
      });
    } else {
      this.productForm = this.fb.group({
        title: ['', Validators.required],
        category: ['', Validators.required],
        price: ['', Validators.required],
        img: '',
        description: ['', Validators.required],
        tags: [''],
        quantity: ['', Validators.required],
      });
    }
    this.getCategories();
  }

  onSubmit() {
    if (this.images != undefined) {
      this.productForm.patchValue({
        img: this.images,
        tags: this.tags,
      });
      if (this.sharedData.productEdit) {
        this.db
          .updateProduct(
            this.productForm.value,
            this.sharedData.product.homepagePosition,
            this.sharedData.product.key
          )
          .subscribe((response) => console.log(response));
      } else {
        this.db.createAndStoreProduct(
          this.productForm.value.title,
          this.productForm.value.category,
          this.productForm.value.price,
          this.productForm.value.img,
          this.productForm.value.description,
          this.productForm.value.tags,
          this.productForm.value.quantity
        );
      }
      this.productForm.reset();
    } else {
      alert('Please add at last one photo!');
    }
  }

  public async upload(event: any): Promise<void> {
    const randomId = Math.random().toString(36).substring(2);

    const imagePath = await this.db.upload(event, randomId);
    this.images.push(imagePath);
  }

  addTag(tag) {
    this.tags.push(tag.value);
  }

  deleteTag(index) {
    this.tags.splice(index, 1);
  }

  getCategories() {
    this.categories = [];
    this.db.fetchCategories().subscribe((categories) => {
      this.category = categories;
      for (let category of categories) {
        this.categories.push(category);
      }
      return this.categories;
    });
  }

  ngOnDestroy(): void {
    this.sharedData.product = null;
    this.sharedData.productEdit = false;
  }
}
