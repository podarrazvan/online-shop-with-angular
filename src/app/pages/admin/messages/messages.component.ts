import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/shared/db.service';
import { Message } from 'src/app/shared/message.interface';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(
    private db: DBService,
    private sharedDataService: SharedDataService
  ) {}

  fbEmails: Message[];

  showMessage: boolean;

  messageToShow: Message;

  ngOnInit(): void {
    this.fbEmails = [];
    this.db.fetchMessages().subscribe((emails) => {
      for (let email of emails) {
        this.fbEmails.push(email);
      }
    });
  }

  openEmail(index) {
    this.messageToShow = this.fbEmails[index];
    this.showMessage = true;
    if (!this.fbEmails[index].seen) {
      this.db.updateMessage(this.fbEmails[index]);
      this.fbEmails[index].seen = true;
      this.sharedDataService.unreadMessages--;
    }
  }

  onDelete(index) {
    this.db.deleteMessage(this.fbEmails[index].key).subscribe();
    this.fbEmails.splice(index, 1);
  }

  close() {
    this.showMessage = false;
  }
}
