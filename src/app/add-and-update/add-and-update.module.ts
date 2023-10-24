import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAndUpdateRoutingModule } from './add-and-update-routing.module';
import { AddEditArtistComponent } from './add-edit-artist/add-edit-artist.component';
import { AddEditMusicComponent } from './add-edit-music/add-edit-music.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddEditArtistComponent, AddEditMusicComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AddAndUpdateRoutingModule,
  ],
})
export class AddAndUpdateModule {}
