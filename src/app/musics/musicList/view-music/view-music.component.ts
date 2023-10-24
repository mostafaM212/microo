import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { Music } from 'src/app/models/music';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
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
  playlist: Track[] = [];
  id: string = '';
  constructor(
    private musicService: MusicService,
    private authService: AuthService,
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
            this.playlist = [
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
  onClick() {
    let favor = this.authService.user$.getValue()?.favorites;
    // favor?.push( this.music ._id)
    if (this.music._id && favor) {
      favor.push(this.music._id as string);
      forkJoin({
        updateMusic: this.musicService.updateMusic((this.music as any)._id, {
          ...this.music,
          rating: (this.music as any).rating + 1,
        }),
        updateUser: this.musicService.addMusicToFavorites(this.music._id),
      })
        .pipe(
          tap((data) => {
            let newUser = this.authService.user$
              .getValue()
              ?.favorites.push((this.music as any)._id);
            this.authService.user$.next(newUser as any);
          }),
          takeUntil(this._unsubscribe$)
        )
        .subscribe();
    }
    console.log('test', 'event');
  }
  displayFavoritesButton(): boolean {
    if (
      this.authService.user$
        .getValue()
        ?.favorites.findIndex((musicId) => musicId == this.music._id) == -1
    ) {
      return true;
    }
    return false;
  }
  triggerOnEnded(event: any) {
    this.musicService
      .updateMusicNumberOfListeners(
        (this.music as any)._id,
        (this.music as any).numberOfListeners + 1
      )
      .pipe(
        tap((data) => {
          let music = this.music;
          music.numberOfListeners = (music?.numberOfListeners as number) + 1;
          this.music = music;
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
