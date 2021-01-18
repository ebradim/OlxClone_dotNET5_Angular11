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
import { AdvertiseDetailsComponent } from './components/advertise-details.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import {
  InfoCircleOutline,
  CommentOutline,
  SendOutline,
  EditOutline,
} from '@ant-design/icons-angular/icons';
import { AdvertiseDetailsTabComponent } from './components/advertise-details-tab.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AdvertiseEditComponent } from './components/advertise-edit.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SendOfferComponent } from './components/send-offer.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const icons: IconDefinition[] = [
  InfoCircleOutline,
  CommentOutline,
  SendOutline,
  EditOutline,
];
@NgModule({
  declarations: [
    AddAdvertiseComponent,
    AdvertiseDetailsComponent,
    AdvertiseDetailsTabComponent,
    AdvertiseEditComponent,
    SendOfferComponent,
  ],
  imports: [
    CommonModule,
    NzUploadModule,
    AdvertiseRouting,
    NzFormModule,
    NzInputModule,
    NzDescriptionsModule,
    NzButtonModule,
    NzAvatarModule,
    NzStepsModule,
    StoreModule.forFeature('advertise', reducers),
    EffectsModule.forFeature([AdvertiseEffects]),
    NzCheckboxModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzMessageModule,
    NzIconModule.forChild(icons),
    NzTabsModule,
    NzTagModule,
    NzModalModule,
    NzSelectModule,
  ],
})
export class AdvertiseModule {}
