import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertiseCardComponent } from '../home/components/advertise-card.component';

const routes: Routes = [{ path: 'create', component: AdvertiseCardComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiseRouting {}
