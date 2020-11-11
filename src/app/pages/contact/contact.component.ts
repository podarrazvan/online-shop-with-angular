import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbUploadService } from 'src/app/shared/db-upload.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private fb: FormBuilder, private dbUploadService: DbUploadService) {}

  contactForm: FormGroup;

  ngOnInit(): void {
    window.scroll(0,0);
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    this.dbUploadService.addMessage(this.contactForm.value);
    this.contactForm.reset();
  }
}
