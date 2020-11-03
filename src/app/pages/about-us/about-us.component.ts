import { Component, OnInit } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private dbFetchDataService: DbFetchDataService) { }

  aboutUs;

  ngOnInit(): void {
    this.dbFetchDataService.fetchAboutUs().subscribe(about => {
      this.aboutUs = about.aboutUs;
    })
  }
}
