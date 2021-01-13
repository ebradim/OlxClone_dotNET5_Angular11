import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupedAdvertise } from 'src/app/root/home/models/SearchAdvertise';
import { environment } from 'src/environments/environment';
import {
  IAddAdvertise,
  IEditAdvertise,
  IResponseAdvertise,
  IResponseHomeAdvertise,
} from '../models/Advertise';

@Injectable({ providedIn: 'root' })
export class AdvertiseService {
  routes = {
    loadHome: '/advertise/load',
    addAdvertise: '/advertise/add',
    root: '/advertise/',
    fav: '/advertise/fav/',
    search: '/advertise/search/',
    like: '/advertise/like/',
  };
  lastTimeUpdate = 0;
  constructor(private client: HttpClient) {}
  public loadHomeAds(): Observable<IResponseHomeAdvertise[]> {
    const endpoint = environment.url + this.routes.loadHome;
    return this.client.get<IResponseHomeAdvertise[]>(endpoint, {
      withCredentials: true,
    });
  }

  public addAdvetise(advertise: IAddAdvertise): Observable<IResponseAdvertise> {
    const endpoint = environment.url + this.routes.addAdvertise;
    return this.client.post<IResponseAdvertise>(endpoint, advertise, {
      withCredentials: true,
    });
  }

  public getAdvetise(id: string): Observable<IResponseAdvertise> {
    const endpoint = environment.url + this.routes.root + id;
    return this.client.get<IResponseAdvertise>(endpoint, {
      withCredentials: true,
    });
  }

  public deleteAdvetise(id: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.root + id;
    return this.client.delete<boolean>(endpoint, {
      withCredentials: true,
    });
  }

  public editAdvetise(
    uniqueId: string,
    advertise: IEditAdvertise
  ): Observable<IResponseAdvertise> {
    const endpoint = environment.url + this.routes.root + uniqueId;
    return this.client.put<IResponseAdvertise>(endpoint, advertise, {
      withCredentials: true,
    });
  }

  public addAdvetiseToFavorite(uniqueId: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.fav + uniqueId;
    return this.client.post<boolean>(
      endpoint,
      {},
      {
        withCredentials: true,
      }
    );
  }

  public removeAdvetiseFromFavorite(uniqueId: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.fav + uniqueId;
    return this.client.delete<boolean>(endpoint, {
      withCredentials: true,
    });
  }

  public searchForAdvertise(term: string): Observable<IGroupedAdvertise[]> {
    const endpoint = environment.url + this.routes.search + term;
    return this.client.get<IGroupedAdvertise[]>(endpoint, {
      withCredentials: true,
    });
  }

  public likeAdvertise(uniqueId: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.like + uniqueId;
    return this.client.post<boolean>(
      endpoint,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
