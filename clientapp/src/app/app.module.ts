import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './root/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRouting } from './app.routing';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavbarComponent } from './root/components/navbar.component';
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
import { TokenEffects } from './root/effects/token.effects';
import { TokenInterceptor } from './root/interceptors/token.interceptor';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ErrorComponentsModule } from './errors/errors.module';
import { HomeEffects } from './root/home/effects/home.effects';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { FormsModule } from '@angular/forms';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NotificationItemComponent } from './root/components/notification-item.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

const icons: IconDefinition[] = [
  SearchOutline,
  HomeOutline,
  GroupOutline,
  UserAddOutline,
  LoginOutline,
  CustomerServiceFill,
];

registerLocaleData(en);
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, NavbarComponent, NotificationItemComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ErrorComponentsModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature('root', reducers),
    EffectsModule.forRoot([TokenEffects, HomeEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    AppRouting,
    NzMenuModule,
    NzNotificationModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzBadgeModule,
    NzIconModule.forChild(icons),

    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
