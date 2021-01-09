import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromTokenActions } from './root/actions';
import { RootState } from './root/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clientapp';
  constructor(private store: Store<RootState>) {
    if (
      document.cookie.split(';').find((x) => x.includes('_sid')) !== undefined
    ) {
      this.store.dispatch(fromTokenActions.refreshToken());
    }
  }
}
