import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/auth/models/API';
import { getCurrentUser, RootState } from 'src/app/root/reducers';
import { IResponseAdvertise } from '../models/Advertise';
import { getSelectedAdvertiseIdEntity } from '../reducers';
import { State } from '../reducers/advertise.reducer';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertise-details',
  templateUrl: '../templates/advertise-details.template.html',
  styleUrls: ['../styles/advertise-details.style.scss'],
})
export class AdvertiseDetailsComponent {
  advertise$: Observable<0 | IResponseAdvertise | null | undefined> | undefined;
  currentUser$: Observable<IUser | null>;

  constructor(private store: Store<State>) {
    this.advertise$ = this.store.pipe(select(getSelectedAdvertiseIdEntity));

    this.currentUser$ = this.store.pipe(select(getCurrentUser));
  }
}
