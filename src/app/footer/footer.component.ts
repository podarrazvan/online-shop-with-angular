import { Component, OnInit } from '@angular/core';
import { DbFetchDataService } from '../shared/db-fetch-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dbFetchDataService: DbFetchDataService) { }

  isLoading = true;
  aboutUs;
  footer;

  ngOnInit(): void {
    this.dbFetchDataService.fetchAboutUs().subscribe((about) => {
      this.aboutUs = about.aboutUs;
      this.dbFetchDataService.fetchFooter().subscribe((footerData) => {
        this.footer = footerData;
        this.isLoading = false;
      });
    });
  }

}
