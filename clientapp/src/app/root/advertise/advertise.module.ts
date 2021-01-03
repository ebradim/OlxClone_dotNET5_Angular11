import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdvertiseRouting } from './advertise.routing';
import { AddAdvertiseComponent } from './components/add-advertise.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EffectsModule } from '@ngrx/effects';
import { AdvertiseEffects } from './effects/advertise.effects';

@NgModule({
  declarations: [AddAdvertiseComponent],
  imports: [
    CommonModule,
    AdvertiseRouting,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    EffectsModule.forFeature([AdvertiseEffects]),
    NzCheckboxModule,
    ReactiveFormsModule,
    NzSelectModule,
  ],
})
export class AdvertiseModule {}
