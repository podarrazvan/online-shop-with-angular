import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbDeleteService } from 'src/app/shared/db-delete.service';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { DbUploadService } from 'src/app/shared/db-upload.service';
import { DbWebsiteEditService } from 'src/app/shared/db-website-edit.sevice';
import { Footer } from 'src/app/shared/footer.interface';

@Component({
  selector: 'app-footer-edit',
  templateUrl: './footer-edit.component.html',
  styleUrls: ['./footer-edit.component.scss'],
})
export class FooterEditComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(
    private dbFetchDataService: DbFetchDataService,
    private dbWebsiteEditService: DbWebsiteEditService,
    private fb: FormBuilder,
    private dbUploadService: DbUploadService,
    private dbDeleteService: DbDeleteService
  ) {}

  footerEditForm: FormGroup;

  facebookLogoPath: string;
  instagramLogoPath: string;
  twitterLogPath: string;

  footerData;

  loading = true;

  ngOnInit(): void {
    this.dbFetchDataService.fetchFooter().subscribe((data) => {
      this.footerData = data;

      this.facebookLogoPath = this.footerData.facebookLogo;
      this.instagramLogoPath = this.footerData.instagramLogo;
      this.twitterLogPath = this.footerData.twitterLogo;

      if(this.facebookLogoPath){
        this.dbDeleteService.deletePhoto(this.facebookLogoPath);
      }

      if(this.instagramLogoPath){
        this.dbDeleteService.deletePhoto(this.instagramLogoPath);
      }

      if(this.twitterLogPath){
        this.dbDeleteService.deletePhoto(this.twitterLogPath);
      }

      this.footerEditForm = this.fb.group({
        adress: [this.footerData.adress, Validators.required],
        phone: [this.footerData.phone, Validators.required],
        email: [this.footerData.email, Validators.required],
        facebookLink: [this.footerData.facebookLink],
        instagramLink: [this.footerData.instagramLink],
        twitterLink: [this.footerData.twitterLink],
        facebookLogo: '',
        twitterLogo: '',
        instagramLogo: '',
      });
      this.loading = false;
    });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.footerEditForm.patchValue({
      facebookLogo: this.facebookLogoPath,
      twitterLogo: this.twitterLogPath,
      instagramLogo: this.instagramLogoPath,
    });
    this.dbWebsiteEditService.footer(this.footerEditForm.value);
    this.close.emit();
  }

  async facebookLogo(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    this.facebookLogoPath = await this.dbUploadService.upload(event, randomId);
  }

  async twitterLogo(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    this.twitterLogPath = await this.dbUploadService.upload(event, randomId);
  }

  async instagramLogo(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    this.instagramLogoPath = await this.dbUploadService.upload(event, randomId);
  }
}
