import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { fromHomeActions } from '../../actions';
import { RootState, selectHomeAdvertises } from '../../reducers';
import { getHomeAds } from '../reducers/home-advertise.reducer';
import { HomeService } from '../services/home.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home-page',
  styleUrls: ['../styles/home-page.styles.scss'],
  templateUrl: '../templates/home-page.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor(
    private homeSerivce: HomeService,
    private store: Store<RootState>
  ) {
    // everytime component renders, it will dispatch and send request
    // prevent multi requests ( user may navaigates between routes too fast which means multiple requests)
    // send request every 5 minutes ( because of rendering )
    // data will be cached in the backend, refresh every one hour
    if (
      this.homeSerivce.lastTimeUpdate === 0 ||
      new Date().getMinutes() - homeSerivce.lastTimeUpdate >= 5
    ) {
      this.store.dispatch(fromHomeActions.loadHomeAdvertises());
      this.homeSerivce.lastTimeUpdate = new Date().getMinutes();
    }
  }
}
