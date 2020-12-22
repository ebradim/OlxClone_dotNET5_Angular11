import { Component, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromTokenActions } from '../actions';
import { IUser } from '../auth/models/API';
import { AuthState } from '../auth/reducers';
import { getCurrentUser } from '../reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: '../templates/navbar.template.html',
  styleUrls: ['../styles/navbar.styles.scss'],
})
export class NavbarComponent {
  user$: Observable<IUser | null> | undefined;

  constructor(private store: Store<AuthState>) {
    if (
      document.cookie.split(';').find((x) => x.includes('_sid')) !== undefined
    ) {
      this.store.dispatch(fromTokenActions.refreshToken());
    }
    this.user$ = this.store.pipe(select(getCurrentUser));
  }
}
