import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicListComponent } from './music-list/music-list.component';
import { ViewMusicComponent } from './musicList/view-music/view-music.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MusicListComponent },
      { path: 'view/:id', component: ViewMusicComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicsRoutingModule {}
