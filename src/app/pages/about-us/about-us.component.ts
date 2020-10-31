import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private db: DBService) { }

  aboutUs;

  ngOnInit(): void {
    this.db.fetchAboutUs().subscribe(about => {
      this.aboutUs = about.aboutUs;
    })
  }
}
