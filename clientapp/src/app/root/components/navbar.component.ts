import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
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

  constructor(private store: Store<RootState>) {
    this.user$ = this.store.pipe(select(getCurrentUser));
    this.notification$ = this.store.pipe(select(selectOffersHubEntities));
    this.notificationCount$ = this.store.pipe(
      select(selectOffersHubEntitiesCount)
    );
  }
  logOut() {
    this.store.dispatch(fromLogoutActions.logout());
  }
}
