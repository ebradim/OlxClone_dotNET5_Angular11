import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './components/search-box.component';
import { HomeRouting } from './home.routing';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchOutline, StarFill } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { HomePageComponent } from './components/home-page.component';
import { AdvertiseCardComponent } from './components/advertise-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';

export const COMPONENTS = [
  HomePageComponent,
  SearchBoxComponent,
  AdvertiseCardComponent,
];
const icons: IconDefinition[] = [SearchOutline, StarFill];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    FormsModule,
    CommonModule,
    HomeRouting,
    NzDividerModule,
    NzToolTipModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule.forChild(icons),
    NzAutocompleteModule,
    NzInputModule,
    NzAvatarModule,
    NzCardModule,
    NzAlertModule,
    NzSkeletonModule,
  ],
})
export class HomeModule {}
