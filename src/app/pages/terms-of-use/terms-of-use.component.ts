import { Component, OnInit } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {

  constructor(private dbFetchDataService: DbFetchDataService) { }

  termsOfUse;

  ngOnInit(): void {
    this.dbFetchDataService.fetchTermsOfUse().subscribe(terms => {
      this.termsOfUse = terms.termsOfUse;
    })
  }

}
