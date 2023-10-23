import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
@NgModule({
  declarations: [NavBarComponent, FooterComponent, HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  exports: [NavBarComponent, FooterComponent],
})
export class HomeModule {}
