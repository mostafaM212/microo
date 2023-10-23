import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'artists',
    loadChildren: () =>
      import('./artists/artists.module').then((m) => m.ArtistsModule),
  },
  {
    path: 'musics',
    loadChildren: () =>
      import('./musics/musics.module').then((m) => m.MusicsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
