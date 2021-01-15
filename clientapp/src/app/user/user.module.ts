import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdvertiseFavoriteComponent } from './components/advertise-favorites.component';
import { UserRouting } from './user.routing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  CloseCircleOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
const icons: IconDefinition[] = [CloseCircleOutline, UserOutline];
@NgModule({
  declarations: [AdvertiseFavoriteComponent],
  imports: [
    CommonModule,
    UserRouting,
    NzButtonModule,
    NzEmptyModule,
    NzNotificationModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature('user', reducers),
    NzIconModule.forChild(icons),
  ],
})
export class UserModule {}
