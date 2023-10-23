import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  musics$ = this.musicService.musics$;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService
      .getMusics()
      .pipe(
        tap((data) => {
          this.musics$.next(data.musics);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    console.log('test', 'asdasd');

    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
