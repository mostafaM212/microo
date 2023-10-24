import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.component.html',
  styleUrls: ['./view-artist.component.scss'],
})
export class ViewArtistComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  artist!: any;

  constructor(
    private artistService: ArtistService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.getArtist(data['id']);
      }
    });
  }

  getArtist(id: string) {
    this.artistService
      .getArtist(id)
      .pipe(
        tap((data) => {
          this.artist = data.artist[0];
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
