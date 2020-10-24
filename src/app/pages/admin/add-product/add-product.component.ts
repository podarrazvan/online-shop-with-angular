import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(private fb: FormBuilder, private uploadService: DBService) {}

  productForm: FormGroup;

  tags: string[] = [];
  image: string;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      img: '',
      description: ['', Validators.required],
      tags: [''],
    });
  }

  onSubmit() {
    this.productForm.patchValue({
      img: this.image,
      tags: this.tags,
    });
    console.log(this.productForm);
    this.uploadService.createAndStoreProduct(
      this.productForm.value.title,
      this.productForm.value.category,
      this.productForm.value.price,
      this.productForm.value.img,
      this.productForm.value.description,
      this.productForm.value.tags
    );
  }

  public async upload(event: any): Promise<void> {
    const randomId = Math.random().toString(36).substring(2);

    const imagePath = await this.uploadService.upload(event, randomId);
    this.image = imagePath;
  }

  addTag(tag) {
    this.tags.push(tag.value);
    console.log(this.tags);
  }

  deleteTag(index) {
    this.tags.splice(index, 1);
  }
}
