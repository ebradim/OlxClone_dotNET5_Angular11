import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthRouting } from './auth.routing';
import { AuthLoginComponent } from './components/authlogin.component';
import { AuthEffects } from './Effects/auth.effect';
import { reducers } from './reducers';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  EyeInvisibleOutline,
  EyeOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthRegisterComponent } from './components/authregister.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const icons: IconDefinition[] = [EyeInvisibleOutline, EyeOutline, UserOutline];

export const COMPONENTS = [AuthLoginComponent, AuthRegisterComponent];
@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    AuthRouting,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule.forChild(icons),
    NzSpinModule,
    NzCheckboxModule,
    NzButtonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
