import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicListComponent } from './music-list/music-list.component';
import { AddEditMusicComponent } from './musicList/add-edit-music/add-edit-music.component';
import { ViewMusicComponent } from './musicList/view-music/view-music.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MusicListComponent },
      { path: 'add', component: AddEditMusicComponent },
      { path: 'view/:id', component: ViewMusicComponent },
      { path: 'edit/:id', component: AddEditMusicComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicsRoutingModule {}
