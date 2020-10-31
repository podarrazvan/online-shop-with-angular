import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {

  constructor(private db: DBService) { }

  termsOfUse;

  ngOnInit(): void {
    this.db.fetchTermsOfUse().subscribe(terms => {
      this.termsOfUse = terms[0].termsOfUse;
    })
  }

}
