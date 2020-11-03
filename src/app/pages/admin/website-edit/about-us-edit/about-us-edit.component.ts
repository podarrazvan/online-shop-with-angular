import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { DbWebsiteEditService } from 'src/app/shared/db-website-edit.sevice';

@Component({
  selector: 'app-about-us-edit',
  templateUrl: './about-us-edit.component.html',
  styleUrls: ['./about-us-edit.component.scss']
})
export class AboutUsEditComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(private dbFetchDataService: DbFetchDataService,
              private dbWebsiteEditService: DbWebsiteEditService ) {}

  aboutUs;

  ngOnInit(): void {
    this. dbFetchDataService.fetchAboutUs().subscribe((about) => {
      this.aboutUs = about.aboutUs;
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave(aboutUs) {
    this.dbWebsiteEditService.editAboutUs(aboutUs.value);
    this.close.emit();
  }
}
