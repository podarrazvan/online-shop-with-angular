import { Component, DoCheck, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, DoCheck {
  constructor(
    private db: DBService,
    private sharedDataService: SharedDataService
  ) {}

  unread: number;

  ngOnInit(): void {
    this.db.fetchMessages().subscribe((emails) => {
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
