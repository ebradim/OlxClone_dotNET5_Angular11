import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthRouting } from './auth.routing';
import { AuthEffects } from './Effects/auth.effect';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    AuthRouting,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
