import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    // pathMatch: 'prefix',
    // component: HomeComponent,
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
  {
    path: 'add',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./add-and-update/add-and-update.module').then(
        (m) => m.AddAndUpdateModule
      ),
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
