import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddAdvertise, IResponseAdvertise } from '../models/Advertise';

@Injectable({ providedIn: 'root' })
export class AdvertiseService {
  routes = {
    loadHome: '/advertise/load',
    addAdvertise: '/advertise/add',
    root: '/advertise/',
  };
  lastTimeUpdate = 0;
  constructor(private client: HttpClient) {}
  public loadHomeAds(): Observable<IResponseAdvertise[]> {
    const endpoint = environment.url + this.routes.loadHome;
    return this.client.get<IResponseAdvertise[]>(endpoint, {
      withCredentials: true,
    });
  }

  public addAdvetise(advertise: IAddAdvertise): Observable<IResponseAdvertise> {
    const endpoint = environment.url + this.routes.addAdvertise;
    return this.client.post<IResponseAdvertise>(endpoint, advertise, {
      withCredentials: true,
    });
  }

  public getAdvetise(uniqueId: string): Observable<IResponseAdvertise> {
    const endpoint = environment.url + this.routes.root + uniqueId;
    return this.client.get<IResponseAdvertise>(endpoint, {
      withCredentials: true,
    });
  }
}
