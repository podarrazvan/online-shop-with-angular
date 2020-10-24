import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor() { }

  fbEmails=[{
    name: 'Georgel',
    subject: 'Un email extrem de super foarte important',
    email: 'georgel@gica.com',
    message: 'Vreau sa zic ca da',
    date: '23/10/20'
  }];

  ngOnInit(): void {
  }

}
