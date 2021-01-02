import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IHomeAdvertises } from '../models/Advertise';
import {
  isHomeAdsError,
  isHomeAdsLoading,
  RootState,
  selectHomeAdvertises,
} from '../../reducers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertise-card',
  styleUrls: ['../styles/advertise-card.styles.scss'],
  templateUrl: '../templates/advertise-card.template.html',
})
export class AdvertiseCardComponent implements OnInit {
  isLoadingAds$: Observable<boolean>;
  isError$: Observable<any>;
  homeAds$: Observable<IHomeAdvertises[]>;
  ngOnInit(): void {
    console.log('xD');
  }
  constructor(private store: Store<RootState>) {
    this.isLoadingAds$ = this.store.pipe(select(isHomeAdsLoading));
    this.isError$ = this.store.pipe(select(isHomeAdsError));
    this.homeAds$ = this.store.pipe(select(selectHomeAdvertises));
  }
}
