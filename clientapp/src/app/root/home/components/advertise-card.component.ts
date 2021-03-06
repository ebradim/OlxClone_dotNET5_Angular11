import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromAdvertise } from 'src/app/advertise/actions';
import {
  IResponseAdvertise,
  IResponseHomeAdvertise,
} from 'src/app/advertise/models/Advertise';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiseCardComponent implements OnInit {
  isLoadingAds$: Observable<boolean>;
  isError$: Observable<any>;
  homeAds$: Observable<IResponseHomeAdvertise[]>;
  ngOnInit(): void {
    console.log('xD');
  }
  constructor(private store: Store<RootState>, private router: Router) {
    this.isLoadingAds$ = this.store.pipe(select(isHomeAdsLoading));
    this.isError$ = this.store.pipe(select(isHomeAdsError));
    this.homeAds$ = this.store.pipe(select(selectHomeAdvertises));
  }

  selectAdvertise(uniqueId: string): void {
    this.router.navigate(['/advertise', uniqueId]);
    //this.store.dispatch(fromAdvertise.selectAdvertise({ uniqueId }));
  }
}
