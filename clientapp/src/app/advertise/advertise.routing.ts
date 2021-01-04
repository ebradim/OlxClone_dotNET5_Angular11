import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdvertiseComponent } from './components/add-advertise.component';
import { AdvertiseDetailsComponent } from './components/advertise-details.component';
import { CreateAdvertiseGuard } from './guards/create-advertise.guard';
import { UnSavedChangesGuard } from './guards/unsaved.guard';

const routes: Routes = [
  {
    path: 'create',
    component: AddAdvertiseComponent,
    canDeactivate: [UnSavedChangesGuard],
    canActivate: [CreateAdvertiseGuard],
  },
  {
    path: ':id',
    component: AdvertiseDetailsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiseRouting {}
