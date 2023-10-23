import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, finalize, takeUntil, tap } from 'rxjs';
import { ArtistService } from 'src/app/services/artist.service';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-add-edit-music',
  templateUrl: './add-edit-music.component.html',
  styleUrls: ['./add-edit-music.component.scss'],
})
export class AddEditMusicComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  artists$ = this.artistService.artists$;
  loaded: number = 0;
  total: number = 0;
  showSpinner: boolean = false;
  //
  allowedIAudios: string[] = ['audio/mpeg'];
  addMode: boolean = true;
  activeFile: any;
  imageUrl: any;
  musicForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    artist: ['', [Validators.required]],
    music: [''],
  });

  constructor(
    private artistService: ArtistService,
    private tostr: ToastrService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private musicService: MusicService
  ) {}
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

  onSelectFile(event: Event) {
    this.activeFile = (event.target as HTMLInputElement).files?.item(0);
    console.log('test', this.activeFile);

    if (
      !this.activeFile ||
      this.allowedIAudios.findIndex((music) => music == this.activeFile.type) ==
        -1
    ) {
      this.tostr.info('invalid extension given');
      return;
    }
    // console.log('test', this.activeFile);

    let reader = new FileReader();

    reader.readAsDataURL(this.activeFile);
    reader.onload = () => {
      this.musicForm.patchValue({
        image: reader.result,
      });
      this.imageUrl = reader.result;
    };
  }
  save() {
    console.log('test', this.musicForm);

    if (this.musicForm.invalid) {
      this.tostr.error('please fill the given data including image');
      return;
    }
    let formData = new FormData();
    formData.append('title', this.musicForm.value.title);
    formData.append('description', this.musicForm.value.description);
    formData.append('artist', this.musicForm.value.artist);
    formData.append('music', this.activeFile);
    console.log('test', formData);

    if (this.addMode) {
      this.musicService
        .addMusic(formData)
        .pipe(
          tap((data: any) => {
            console.log('test', data);
            this.showSpinner = true;
            this.loaded = data.loaded;
            this.total = data.total;
          }),
          finalize(() => {
            this.router.navigate(['']);
            this.tostr.success('artist is added successfully');
          }),
          takeUntil(this._unsubscribe$)
        )
        .subscribe();
    }
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
