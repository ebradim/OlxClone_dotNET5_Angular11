import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRouting } from './app.routing';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavbarComponent } from './components/navbar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  SearchOutline,
  HomeOutline,
  GroupOutline,
  UserAddOutline,
  LoginOutline,
  CustomerServiceFill,
} from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { TokenEffects } from './effects/token.effects';

const icons: IconDefinition[] = [
  SearchOutline,
  HomeOutline,
  GroupOutline,
  UserAddOutline,
  LoginOutline,
  CustomerServiceFill,
];

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature('root', reducers),
    EffectsModule.forRoot([TokenEffects]),
    StoreRouterConnectingModule.forRoot(),
    AppRouting,
    NzMenuModule,
    NzButtonModule,
    NzAvatarModule,
    NzIconModule.forChild(icons),

    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
