import { Component, DoCheck, OnInit } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/db-fetch-data.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, DoCheck {
  constructor(
    private dbFetchDataService: DbFetchDataService,
    private sharedDataService: SharedDataService
  ) {}

  unread: number;
  
  hide = false;

  ngOnInit(): void {
    this.dbFetchDataService.fetchMessages().subscribe((emails) => {
      this.sharedDataService.unreadMessages = 0;
      for (let email of emails) {
        if (!email.seen) {
          this.sharedDataService.unreadMessages++;
        }
      }
      this.unread = this.sharedDataService.unreadMessages;
    });
  }

  ngDoCheck() {
    this.unread = this.sharedDataService.unreadMessages;
  }
}
