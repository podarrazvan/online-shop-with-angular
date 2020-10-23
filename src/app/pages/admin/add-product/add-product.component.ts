import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor() {}

  tags: string[] = [];

  ngOnInit(): void {}

  addTag(tag) {
    this.tags.push(tag.value);
    console.log(this.tags);
  }

  deleteTag(index) {
    this.tags.splice(index,1);
  }
  
}
