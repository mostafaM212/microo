import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ViewArtistComponent } from './artist-list/view-artist/view-artist.component';
import { AddEditArtistComponent } from './artist-list/add-edit-artist/add-edit-artist.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ArtistListComponent },
      { path: 'add', component: AddEditArtistComponent },
      { path: 'view/:id', component: ViewArtistComponent },
      { path: 'edit/:id', component: AddEditArtistComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistsRoutingModule {}
