import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { DbWebsiteEditService } from 'src/app/shared/db-website-edit.sevice';

@Component({
  selector: 'app-terms-of-use-edit',
  templateUrl: './terms-of-use-edit.component.html',
  styleUrls: ['./terms-of-use-edit.component.scss'],
})
export class TermsOfUseEditComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(private dbWebsiteEditService: DbWebsiteEditService,
              private dbFetchDataService: DbFetchDataService) {}

  termsOfUse;

  ngOnInit(): void {
    this.dbFetchDataService.fetchTermsOfUse().subscribe((terms) => {
      this.termsOfUse = terms.termsOfUse;
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave(termsOfUse) {
    this.dbWebsiteEditService.editTermsOfUse(termsOfUse.value);
    this.close.emit();
  }
}
