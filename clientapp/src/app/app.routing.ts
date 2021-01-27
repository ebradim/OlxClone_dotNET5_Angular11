import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/components/notfound.component';
import { AuthGuard } from './root/guards/auth.guard';
const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('././root/home/home.module').then((x) => x.HomeModule),
  },
  {
    path: 'advertise',
    loadChildren: () =>
      import('./advertise/advertise.module').then((x) => x.AdvertiseModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],

    loadChildren: () => import('./user/user.module').then((x) => x.UserModule),
  },
  {
    path: 'explore',
    loadChildren: () =>
      import('./explore/explore.module').then((x) => x.ExploreModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
