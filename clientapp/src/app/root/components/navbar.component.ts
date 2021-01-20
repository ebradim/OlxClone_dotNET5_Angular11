import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { dir } from 'console';
import { Observable } from 'rxjs';
import { fromLogoutActions } from 'src/app/auth/actions';
import { IUser } from '../../auth/models/API';
import { IReceivedOffer } from '../home/models/OffersHubs';
import {
  getCurrentUser,
  RootState,
  selectOffersHubEntities,
  selectOffersHubEntitiesCount,
} from '../reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: '../templates/navbar.template.html',
  styleUrls: ['../styles/navbar.styles.scss'],
})
export class NavbarComponent {
  user$: Observable<IUser | null> | undefined;

  notification$: Observable<IReceivedOffer[]>;
  notificationCount$: Observable<any>;
  html = document.getElementsByTagName('html')[0];

  languages = [
    {
      language: 'English',
      value: 'en',
    },
    {
      language: 'عربي',
      value: 'ar',
    },
  ];

  constructor(
    private store: Store<RootState>,
    public translate: TranslateService
  ) {
    this.user$ = this.store.pipe(select(getCurrentUser));
    this.notification$ = this.store.pipe(select(selectOffersHubEntities));
    this.notificationCount$ = this.store.pipe(
      select(selectOffersHubEntitiesCount)
    );
    this.translate.addLangs([Langs.Arabic, Langs.English]);
    this.translate.setDefaultLang(Langs.English);
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      browserLang.match(/en|ar/) ? browserLang : Langs.English
    );
  }
  logOut(): void {
    this.store.dispatch(fromLogoutActions.logout());
  }
  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  getSelectedLang(): string {
    // tslint:disable-next-line: no-non-null-assertion
    return this.languages.find((x) => x.value === this.translate.currentLang)!
      .language;
  }
}

export enum Langs {
  Arabic = 'ar',
  English = 'en',
}
