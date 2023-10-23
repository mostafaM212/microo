import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnDestroy, OnInit {
  _unsubscribe$ = new Subject<boolean>();
  artists$ = this.artistService.artists$;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService
      .getArtists()
      .pipe(
        tap((data) => {
          this.artists$.next(data.artists);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    // console.log('test', 'asdasd');

    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
