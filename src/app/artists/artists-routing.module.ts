import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ViewArtistComponent } from './artist-list/view-artist/view-artist.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ArtistListComponent },
      { path: 'view/:id', component: ViewArtistComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistsRoutingModule {}
