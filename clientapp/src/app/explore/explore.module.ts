import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExplorePageComponent } from './components/explore-page.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ExploreRouting } from './explore.routing';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { FilterOutline } from '@ant-design/icons-angular/icons';
import { AdvertiseExploreComponent } from './components/advertise-explore.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { FilterEffects } from './effects/filter.effects';

const icons: IconDefinition[] = [FilterOutline];
@NgModule({
  declarations: [ExplorePageComponent, AdvertiseExploreComponent],
  imports: [
    CommonModule,
    NzPaginationModule,
    ExploreRouting,
    NzSelectModule,
    NzButtonModule,
    NzCardModule,
    EffectsModule.forFeature([FilterEffects]),
    StoreModule.forFeature('filter', reducers),
    ReactiveFormsModule,
    NzIconModule.forChild(icons),
  ],
})
export class ExploreModule {}
