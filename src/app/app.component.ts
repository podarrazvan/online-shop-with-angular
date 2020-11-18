import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SharedDataService } from './shared/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {}

  title = 'shop';

  ngOnInit(): void {

    window.innerWidth > 850 ? this.sharedDataService.mobile = false : this.sharedDataService.mobile = true;

    this.authService.autoLogin();

    if (localStorage.getItem('userData')) {
      this.sharedDataService.updateAuth(true);
    } else {
      this.sharedDataService.updateAuth(false);
    }

    if (localStorage.getItem('cart')) {
      this.sharedDataService.updateCart(false);
    } else {
      this.sharedDataService.updateCart(true);
    }
  }
}
