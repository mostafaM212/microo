import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'musician';
  showFiller: boolean = false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    if (!this.authService.isAuthenticated$.getValue()) {
      this.authService.autoLogin();
    }
    setInterval(() => {
      this.authService.autoLogin();
    }, 600000);
  }
}
