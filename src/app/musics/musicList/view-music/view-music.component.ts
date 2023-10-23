import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Subject, takeUntil, tap } from 'rxjs';
import { Music } from 'src/app/models/music';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-view-music',
  templateUrl: './view-music.component.html',
  styleUrls: ['./view-music.component.scss'],
})
export class ViewMusicComponent implements OnInit, OnDestroy, AfterViewInit {
  _unsubscribe$ = new Subject<boolean>();
  music!: Music;

  mssapDisplayTitle = true;
  mssapDisablePositionSlider = true;
  mssapDisplayRepeatControls = true;
  mssapDisplayVolumeControls = true;
  mssapDisplayVolumeSlider = false;

  // For Streaming Audio From URL
  // set mediaType = 'stream'
  mssapPlaylist: Track[] = [];
  id: string = '';
  constructor(
    private musicService: MusicService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.id = data['id'];
        this.getMusic();
      }
    });
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.getMusic;
  }
  getMusic() {
    this.musicService
      .getMusic(this.id)
      .pipe(
        tap((data) => {
          if (data) {
            this.music = data.music;
            this.mssapPlaylist = [
              {
                title: this.music.title,
                link: this.music.path,
                mediaType: 'stream',
              },
            ];
          }
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  onEnded(event: any) {
    console.log('test', event);
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
