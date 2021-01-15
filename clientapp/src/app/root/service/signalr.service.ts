import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { fromAPIActions } from '../actions';
import { RootState } from '../reducers';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  constructor(private store: Store<RootState>) {}
  connection: signalR.HubConnection | undefined;
  public runWebsocket() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/offerhub')
      .build();

    this.connection
      .start()
      .then(() => {
        // this.store.dispatch(fromAPIActions.establishWebsocketSuccess());
      })
      .catch((e) => console.log(e));
    this.connection.on('ReceiveOffer', (data) => {
      this.store.dispatch(fromAPIActions.onReceivedOfferSuccess({ data }));
    });
  }

  invokeOffer(userName: string, obj: any) {
    this.connection
      ?.invoke('SendPrivateOffer', userName, obj)
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
  }
}
