import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditArtistComponent } from './add-edit-artist/add-edit-artist.component';
import { AddEditMusicComponent } from './add-edit-music/add-edit-music.component';

const routes: Routes = [
  {
    path: 'music',
    component: AddEditArtistComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'music/:id',
    component: AddEditArtistComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'artist',
    component: AddEditMusicComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'artist/:id',
    component: AddEditMusicComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAndUpdateRoutingModule {}
