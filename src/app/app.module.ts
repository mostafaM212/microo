import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    LoadingBarRouterModule,
    AuthModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatSidenavModule,
    NgxAudioPlayerModule,
  ],
  providers: [
    {
      useClass: ErrorInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
    {
      useClass: AuthInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
