import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AdvertiseService } from 'src/app/advertise/services/advertise.service';
import { fromHomeActions } from '../../actions';
import {
  isHomeAdsError,
  RootState,
  selectHomeAdvertises,
} from '../../reducers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home-page',
  styleUrls: ['../styles/home-page.styles.scss'],
  templateUrl: '../templates/home-page.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  isHomeError$: Observable<boolean>;
  constructor(
    private homeSerivce: AdvertiseService,
    private store: Store<RootState>
  ) {
    // everytime component renders, it will dispatch and send request
    // prevent multi requests ( user may navaigates between routes too fast which means multiple requests)
    // send request every 5 minutes ( because of rendering )
    // data will be cached in the backend, refresh every one hour
    if (
      this.homeSerivce.lastTimeUpdate === 0 ||
      new Date().getSeconds() - homeSerivce.lastTimeUpdate >= 10
    ) {
      this.store.dispatch(fromHomeActions.loadHomeAdvertises());
      this.homeSerivce.lastTimeUpdate = new Date().getSeconds();
    }
    this.isHomeError$ = this.store.pipe(select(isHomeAdsError));
  }
}
