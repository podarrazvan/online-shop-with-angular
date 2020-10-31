import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-terms-of-use-edit',
  templateUrl: './terms-of-use-edit.component.html',
  styleUrls: ['./terms-of-use-edit.component.scss'],
})
export class TermsOfUseEditComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(private db: DBService) {}

  termsOfUse;

  ngOnInit(): void {
    this.db.fetchTermsOfUse().subscribe((terms) => {
      this.termsOfUse = terms[0].termsOfUse;
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave(termsOfUse) {
    this.db.editTermsOfUse(termsOfUse.value);
    this.close.emit();
  }
}
