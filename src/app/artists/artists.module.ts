import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { AddEditArtistComponent } from '../add-and-update/add-edit-artist/add-edit-artist.component';
import { ViewArtistComponent } from './artist-list/view-artist/view-artist.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ArtistListComponent, ViewArtistComponent],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ArtistsModule {}
