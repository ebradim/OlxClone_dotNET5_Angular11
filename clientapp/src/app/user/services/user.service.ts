import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFavoriteAdvertise } from '../models/FavoriteAdvertise';

@Injectable({ providedIn: 'root' })
export class UserService {
  routes = {
    fav: '/advertise/fav',
  };
  constructor(private client: HttpClient) {}
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
}
