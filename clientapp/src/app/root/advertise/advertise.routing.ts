import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertiseCardComponent } from '../home/components/advertise-card.component';
import { AddAdvertiseComponent } from './components/add-advertise.component';
import { CreateAdvertiseGuard } from './guards/create-advertise.guard';

const routes: Routes = [
  {
    path: 'create',
    component: AddAdvertiseComponent,
    canActivate: [CreateAdvertiseGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiseRouting {}
