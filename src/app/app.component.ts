import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationCancel, NavigationError, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'musician';
  showFiller: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.router.events.subscribe((data) => {
      // get the data from the snapshot
      // console.log('test', data);
      if (data instanceof NavigationCancel || data instanceof NavigationError) {
        this.router.navigate(['']);
      }
    });
    if (!this.authService.isAuthenticated$.getValue()) {
      this.authService.autoLogin();
    }
    setInterval(() => {
      this.authService.autoLogin();
    }, 600000);
  }
}
