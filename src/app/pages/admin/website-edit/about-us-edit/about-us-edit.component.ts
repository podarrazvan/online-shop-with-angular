import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-about-us-edit',
  templateUrl: './about-us-edit.component.html',
  styleUrls: ['./about-us-edit.component.scss']
})
export class AboutUsEditComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(private db: DBService) {}

  aboutUs;

  ngOnInit(): void {
    this.db.fetchAboutUs().subscribe((about) => {
      this.aboutUs = about.aboutUs;
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave(aboutUs) {
    this.db.editAboutUs(aboutUs.value);
    this.close.emit();
  }
}
