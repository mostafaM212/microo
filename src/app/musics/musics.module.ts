import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicsRoutingModule } from './musics-routing.module';
import { MusicListComponent } from './music-list/music-list.component';
import { AddEditMusicComponent } from './musicList/add-edit-music/add-edit-music.component';
import { ViewMusicComponent } from './musicList/view-music/view-music.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [MusicListComponent, AddEditMusicComponent, ViewMusicComponent],
  imports: [
    CommonModule,
    MusicsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxAudioPlayerModule,
  ],
})
export class MusicsModule {}
