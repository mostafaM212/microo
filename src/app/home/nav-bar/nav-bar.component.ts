import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Output('toggle') toggleEvent = new EventEmitter();
  @Input('drawer') drawer!: MatDrawer;
  user$ = this.authService.user$;
  showImage: boolean = true;
  currentRoute: string = '';
  darkColor: boolean = false;
  constructor(
    private dialogRef: MatDialog,
    public authService: AuthService,
    private router: Router // private location: Location
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.drawer.openedChange.subscribe((data) => {
      this.showImage = !data;
    });
    console.log('test');

    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event) => {
    //     this.currentRoute = (event as any).url;
    //     console.log('test', this.currentRoute.split('/'));

    //     this.darkColor = this.currentRoute.split('/').length == 2;
    //   });
  }
  navigate() {
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
    // this.location.back();
  }
  openRegisterDialog() {
    let open = this.dialogRef.open(RegisterComponent, {
      width: '60%',
    });

    open.afterClosed().subscribe((data) => {
      console.log('test', 'asdasd');
    });
  }

  openLoginDialog() {
    let open = this.dialogRef.open(LoginComponent, {
      width: '60%',
    });

    open.afterClosed().subscribe((data) => {
      console.log('test', 'asdasd');
    });
  }
  onToggle() {
    // this.showImage = false;
    this.drawer.open();
  }
  navigateUser() {
    this.router.navigate(['artists', 'add']);
  }
  logoutHandler() {
    this.authService.logout();
  }
}
