import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromTokenActions } from './root/actions';
import { RootState } from './root/reducers';
import { SignalRService } from './root/service/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clientapp';
  constructor(
    private store: Store<RootState>,
    private signalr: SignalRService
  ) {
    if (
      document.cookie.split(';').find((x) => x.includes('_sid')) !== undefined
    ) {
      this.store.dispatch(fromTokenActions.refreshToken());
      this.signalr.runWebsocket();
    }
  }
}
