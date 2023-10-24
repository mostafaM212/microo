import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, tap } from 'rxjs';
import { ArtistService } from 'src/app/services/artist.service';
import { mimeTypeValidator } from 'src/app/validators/imageValidator';

@Component({
  selector: 'app-add-edit-artist',
  templateUrl: './add-edit-artist.component.html',
  styleUrls: ['./add-edit-artist.component.scss'],
})
export class AddEditArtistComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();

  allowedImages: string[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp',
  ];
  addMode: boolean = true;
  activeFile: any;
  imageUrl: any;
  artistForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  constructor(
    private artistService: ArtistService,
    private tostr: ToastrService,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSelectFile(event: Event) {
    this.activeFile = (event.target as HTMLInputElement).files?.item(0);
    // console.log('test', this.activeFile.type);

    if (
      !this.activeFile ||
      this.allowedImages.findIndex((image) => image == this.activeFile.type) ==
        -1
    ) {
      this.tostr.info('invalid extension given');
      return;
    }
    // console.log('test', this.activeFile);

    let reader = new FileReader();

    reader.readAsDataURL(this.activeFile);
    reader.onload = () => {
      this.artistForm.patchValue({
        image: reader.result,
      });
      this.imageUrl = reader.result;
    };
  }
  save() {
    if (this.artistForm.invalid) {
      this.tostr.error('please fill the given data including image');
      return;
    }
    let formData = new FormData();
    formData.append('name', this.artistForm.value.name);
    formData.append('description', this.artistForm.value.description);
    formData.append('dateOfBirth', this.artistForm.value.dateOfBirth);
    formData.append('image', this.activeFile);

    if (this.addMode) {
      this.artistService
        .addArtist(formData)
        .pipe(
          tap((data) => {
            this.tostr.success('artist is added successfully');
            this.router.navigate(['']);
          })
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
