import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertiseFavoriteComponent } from './components/advertise-favorites.component';

const routes: Routes = [
  {
    path: 'favorites',
    component: AdvertiseFavoriteComponent,
  },
  { path: '', redirectTo: 'favorites', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRouting {}
