import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFavoriteAdvertise } from '../models/FavoriteAdvertise';
import * as signalR from '@microsoft/signalr';
@Injectable({ providedIn: 'root' })
export class UserService {
  routes = {
    fav: '/advertise/fav',
  };
  constructor(private client: HttpClient, private msg: NzNotificationService) {}
  public getFavoriteAdvertises(): Observable<IFavoriteAdvertise[]> {
    const url = environment.url + this.routes.fav;
    return this.client.get<IFavoriteAdvertise[]>(url, {
      withCredentials: true,
    });
  }

  public removeAdvetiseFromFavorite(uniqueId: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.fav + '/' + uniqueId;
    return this.client.delete<boolean>(endpoint, {
      withCredentials: true,
    });
  }
  public initializeHub(): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/offerhub')
      .build();
    connection.on('ReceiveOffer', (data) => {
      this.msg.info('Notification', data);
    });
    const offer = {
      advertiseId: 'FROM-AHMED-MOHAMED-1ee88084',
      title: 'ACCEPT MY OFFER',
      message: 'for 200$ last offer',
    };
    connection
      .start()
      .then(() => {
        connection.invoke('SendPrivateOffer', 'ahmedmohamed', offer);
      })
      .catch((e) => console.log(e));
  }
}
