import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromAdvertise } from 'src/app/advertise/actions';
import { fromFavoriteAdvertisesActions } from '../actions';
import { IFavoriteAdvertise } from '../models/FavoriteAdvertise';
import {
  getFavoriteAdvertises,
  getTotalCache,
  isFavAdsLoading,
  UserState,
} from '../reducers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertise-favorite',
  templateUrl: '../templates/advertise-favorites.templates.html',
  styleUrls: ['../styles/advertise-favorites.styles.scss'],
})
export class AdvertiseFavoriteComponent {
  favoriteAds$: Observable<IFavoriteAdvertise[]>;
  loading$: Observable<boolean>;
  totalCache$: Observable<number>;

  constructor(private store: Store<UserState>, private router: Router) {
    this.loading$ = this.store.pipe(select(isFavAdsLoading));
    this.favoriteAds$ = this.store.pipe(select(getFavoriteAdvertises));
    this.totalCache$ = this.store.pipe(select(getTotalCache));
    this.store.dispatch(fromFavoriteAdvertisesActions.getFavoriteAdvertises());
  }

  viewDetails(uniqueId: string): void {
    this.router.navigate(['/advertise', uniqueId]);
  }

  removeFromFavorite(uniqueId: string): void {
    this.store.dispatch(
      fromFavoriteAdvertisesActions.removeAdvertisesFromFavorite({ uniqueId })
    );
  }
}
